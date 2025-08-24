import { nearRunnerCourses, popularCourses } from '@/api/course/course.service';
import { userInfo } from '@/api/user/user.service';
import FloatingButton from '@/components/button/floating-button';
import NearByRunnerCourseItem from '@/components/item/nearby-runner-course-item';
import NoDataItem from '@/components/item/no-data-item';
import PopularCourseItem from '@/components/item/popular-course-item';
import VerticalList from '@/components/list/verical-list';
import LoadingSpinner from '@/components/loading';
import LocationSettingModal from '@/components/modal/location-setting-modal';
import LocationSettingText from '@/components/text/location-setting-text';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useLocationStore } from '@/stores/location-store';
import { useModalStore } from '@/stores/modal-store';
import { base, gray } from '@/styles/color';
import type { NearUserCoursesResponse, PopularCoursesResponse } from '@/types/course';
import { showErrorAlert } from '@/utils/error-handler';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const [nearByRunnerData, setNearByRunnerData] = useState<NearUserCoursesResponse[]>([]);
  const [popularCoursesData, setPopularCoursesData] = useState<PopularCoursesResponse[]>(
    [],
  );
  const [isButtonTextVisible, setIsButtonTextVisible] = useState(true);

  const insets = useSafeAreaInsets();
  const { selectedLocation, selectedCoords } = useLocationStore();
  const { modalVisible, setModalVisible } = useModalStore();

  const { getCurrentLocation, isGetCurrentLocationLoading } = useCurrentLocation();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset === 0) {
      setIsButtonTextVisible(true);
    } else {
      setIsButtonTextVisible(false);
    }
  };

  const handleFetchNearRunner = async () => {
    if (!selectedCoords?.lat || !selectedCoords.lng) return;
    try {
      const { lat: latitude, lng: longitude } = selectedCoords;
      const radius = 1000;
      const maxCount = 10;
      const params = {
        latitude,
        longitude,
        radius,
        maxCount,
      };
      const response = await nearRunnerCourses(params);
      setNearByRunnerData(response ?? []);
    } catch (error) {
      showErrorAlert(
        error,
        'NEAR_RUNNER_COURSES',
        '주변 코스를 불러오는데 실패했습니다.',
      );
      setNearByRunnerData([]);
    }
  };

  const handleFetchPopularCourses = async () => {
    if (!selectedCoords?.lat || !selectedCoords.lng) return;
    try {
      const { lat: latitude, lng: longitude } = selectedCoords;

      const radius = 1000;
      const maxCount = 10;
      const params = {
        // TODO: 임시로 고정 값 사용, 추후 위치 기반으로 수정
        latitude: 37.5665,
        longitude: 126.978,

        radius,
        maxCount,
      };
      const response = await popularCourses(params);
      setPopularCoursesData(response ?? []);
    } catch (error) {
      showErrorAlert(error, 'POPULAR_COURSES', '인기 코스를 불러오는데 실패했습니다.');
      setPopularCoursesData([]);
    }
  };

  useEffect(() => {
    if (selectedLocation.length === 0) {
      getCurrentLocation();
    }
  }, [getCurrentLocation, selectedLocation]);

  useEffect(() => {
    handleFetchNearRunner();
    handleFetchPopularCourses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCoords?.lat, selectedCoords?.lng]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await userInfo();
      } catch (error) {
        showErrorAlert(error, 'USER_INFO', '사용자 정보를 불러오는데 실패했습니다.');
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.subContainer}>
        {selectedLocation && (
          <View style={styles.locationTextContainer}>
            <LocationSettingText
              selectedLocation={selectedLocation}
              setModalVisible={setModalVisible}
            />
            <View style={styles.sectionContainer}>
              <View style={styles.section}>
                <Pressable style={styles.titleBarContainer}>
                  <View style={styles.titleBar}>
                    <Text style={styles.title}>근처 러너들이 달리는 코스 🔥</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="#9CA3AF"
                  />
                </Pressable>

                {nearByRunnerData.length > 0 ? (
                  <VerticalList
                    isHorizontal={true}
                    data={nearByRunnerData}
                    renderItem={NearByRunnerCourseItem}
                  />
                ) : (
                  <View
                    style={[
                      styles.noDataNearRunnerCourseContainer,
                      { marginTop: '20%', marginBottom: '20%' },
                    ]}
                  >
                    <NoDataItem />
                    <View style={styles.noDataTextContainer}>
                      <Text style={styles.noDataText}>다른 위치로 설정하면</Text>
                      <Text style={styles.noDataText}>
                        근처 러너들을 확인할 수 있어요.
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <View style={styles.titleBarContainer}>
                  <View style={styles.titleBar}>
                    <Text style={styles.title}>인기코스 👍🏻</Text>
                  </View>
                </View>
                {popularCoursesData.length > 0 ? (
                  <VerticalList
                    data={popularCoursesData}
                    renderItem={(item) => (
                      <PopularCourseItem
                        {...item}
                        handleFetch={handleFetchPopularCourses}
                      />
                    )}
                    handleScroll={handleScroll}
                  />
                ) : (
                  <View
                    style={[
                      styles.noDataPopularCourseContainer,
                      {
                        marginTop: '34%',
                        marginBottom: '20%',
                      },
                    ]}
                  >
                    <NoDataItem />
                    <View style={styles.noDataTextContainer}>
                      <Text style={styles.noDataText}>다른 위치로 설정하면</Text>
                      <Text style={styles.noDataText}>인기코스를 확인할 수 있어요.</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <FloatingButton
              buttonText={isButtonTextVisible ? '기록하기' : ''}
              width={isButtonTextVisible ? 120 : 52}
              height={52}
            />
          </View>
        )}

        {modalVisible && (
          <LocationSettingModal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
          />
        )}
        {isGetCurrentLocationLoading && <LoadingSpinner />}
      </View>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: base['white'],
  },
  subContainer: {
    flex: 1,
    width: '100%',
  },
  locationTextContainer: {
    width: '100%',
    position: 'relative',
  },
  sectionContainer: {
    height: '100%',
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
  },

  section: {
    display: 'flex',
    padding: 8,
  },
  titleBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  noDataNearRunnerCourseContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 8,
  },

  noDataPopularCourseContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 8,
  },
  noDataTextContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  noDataText: {
    color: gray[30],
    fontSize: 16,
  },
});
