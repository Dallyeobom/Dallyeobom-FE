import NearByRunnerCourseItem from '@/components/item/nearby-runner-course-item';
import PopularCourseItem from '@/components/item/popular-course-item';
import VerticalList from '@/components/list/verical-list';
import LocationSettingModal from '@/components/modal/location-setting-modal';
import LocationSettingText from '@/components/text/location-setting-text';
import callGoogleMapsApi from '@/hooks/use-google-map-api';
import { nearByRunnerData, popularCourseData } from '@/mocks/data';
import { useLocationStore } from '@/stores/location-store';
import { useModalStore } from '@/stores/modal-store';
import { base } from '@/styles/color';
import { getGoogleMapsApiKey, getKoreanAddress } from '@/utils/google';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const insets = useSafeAreaInsets();
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const { modalVisible, setModalVisible } = useModalStore();

  console.log('모달이 보인다아아', modalVisible);
  const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

  // 현재 위치를 가져오는 로케이션
  const getCurrentLocation = async () => {
    // console.log('모달을 닫눈다아아아');
    // console.log('selectedLocation', selectedLocation);

    // 현재 선택 된게 없을떄에만 자동으로 현재 위치를 가져온다.
    if (!selectedLocation) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치권한이 허락실패', '위치 권한을 허락해주세요', [
          {
            text: 'Open settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude}, ${location.coords.longitude}&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
      const data = await callGoogleMapsApi(url);
      const address_components = data.results[0].address_components;
      const result = getKoreanAddress(address_components);
      setSelectedLocation(result, {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.subContainer}>
        {selectedLocation && (
          <View style={styles.locationTextContainer}>
            <LocationSettingText
              selectedLocation={selectedLocation}
              setModalVisible={setModalVisible}
            />
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                height: '100%',
                display: 'flex',
              }}
            >
              <View style={styles.section}>
                <Pressable style={styles.titleBarContainer}>
                  <View style={styles.titleBar}>
                    <Text style={styles.title}>근처 러너들이 달리는 코스</Text>
                    <Image source={require('@/assets/images/fire.png')} />
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="#9CA3AF"
                  />
                </Pressable>
                <VerticalList
                  isHorizontal={true}
                  data={nearByRunnerData}
                  renderItem={NearByRunnerCourseItem}
                />
              </View>

              <View style={styles.section}>
                <View style={styles.titleBarContainer}>
                  <View style={styles.titleBar}>
                    <Text style={styles.title}>인기코스</Text>
                    <Image source={require('@/assets/images/thumbs-up.png')} />
                  </View>
                </View>
                <VerticalList
                  data={popularCourseData}
                  renderItem={PopularCourseItem}
                />
              </View>
            </View>
          </View>
        )}
        {modalVisible && (
          <LocationSettingModal
            visible={modalVisible}
            onClose={() => {
              getCurrentLocation();
              setModalVisible(false);
            }}
          />
        )}
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

  verticalListContainer: {},
});
