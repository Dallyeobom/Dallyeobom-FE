import TwoButtonAlert from '@/components/alert/two-button-alert';
import CoursePath from '@/components/line/course-path';
import LoadingSpinner from '@/components/loading';
import ModalBackground from '@/components/modal/modal-background';
import { useTrackingStore } from '@/stores/tracking-store';
import { gray } from '@/styles/color';
import { calculateTotalDistance } from '@/utils/tracking';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export interface LocationType {
  latitude: number;
  longitude: number;
}

function Index() {
  const [location, setLocation] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);

  // for timer
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [remainingTime, setRemainigTime] = useState(10000);
  const [distance, setDistance] = useState(0);

  const startTimeRef = useRef<number | null>(null); // 시간은 ref로.
  const timerIdRef = useRef<number | null>(null); // pause할떄 삭제하기 위한 timerId
  const router = useRouter();

  const handleTotalTrackingHour = useTrackingStore(
    (state) => state.handleTotalTrackingHour,
  );

  const handleTotalTrackingMinute = useTrackingStore(
    (state) => state.handleTotalTrackingMinute,
  );

  const handleTotalTrackingDistance = useTrackingStore(
    (state) => state.handleTotalTrackingDistance,
  );

  const handleTotalTrackingLocation = useTrackingStore(
    (state) => state.handleTotalTrackingLocation,
  );

  const handleOpenModal = () => {
    setIsModal(true);
    pauseTime();
  };

  const handleTerminate = () => {
    if (!timerIdRef.current || !startTimeRef.current) return;
    setIsModal(false);
    setIsPause(true);
    clearTimeout(timerIdRef.current);
    clearTimeout(startTimeRef.current);
    handleTotalTrackingHour(hour);
    handleTotalTrackingMinute(minute);
    handleTotalTrackingDistance(distance);
    // reset
    setHour(0);
    setMinute(0);
    setDistance(0);
    handleTotalTrackingLocation(location);
    getCurrentLocation();
    router.push('/tracking/complete');
  };

  const startTime = () => {
    startTimeRef.current = Date.now();
    timerIdRef.current = setTimeout(() => {
      setMinute((prev) => (prev === 59 ? 0 : prev + 1));
      setHour((prev) => {
        if (minute === 59) {
          return prev + 1;
        }
        return prev;
      });
      setRemainigTime(10000);
    }, remainingTime);
  };

  const pauseTime = () => {
    setIsPause(true);
    if (timerIdRef.current && startTimeRef.current) {
      clearTimeout(timerIdRef.current);
      const elapsedTime = Date.now() - startTimeRef.current;
      setRemainigTime(elapsedTime);
    }
  };
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;

    setLocation([{ latitude: latitude, longitude: longitude }]);
    setIsLoading(false);
  }

  const renderPolyLine = CoursePath();
  useEffect(() => {
    if (!isPause) {
      startTime();
    }
  }, [minute, isPause]);

  useEffect(() => {
    const result = calculateTotalDistance(location);
    setDistance(result);
  }, [location.length]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <View>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location[0].latitude,
              longitude: location[0].longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            // TODO:nRegionChange 이벤트 핸들러 내에서 setInterval을 사용하는 것은 심각한 성능 문제와 메모리 누수를 유발
            // 사용자의 실시간 위치를 추적하려면 expo-location의 watchPositionAsync API를 사용하는 것이 올바른 방법
            onRegionChange={(region) => {
              setLocation((prev) => {
                setInterval(() => {
                  const newData = [
                    ...prev,
                    { latitude: region.latitude, longitude: region.longitude },
                  ];
                  return newData;
                }, 5000);
                return prev;
              });
            }}
            onRegionChangeComplete={(region) => {
              setLocation((prev) => {
                return [
                  ...prev,
                  { latitude: region.latitude, longitude: region.longitude },
                ];
              });
            }}
          >
            <Marker
              coordinate={location[0]}
              title="Start"
            />

            {/* 경로 path  */}
            {renderPolyLine(location)}
          </MapView>
          <View style={styles.timerContainer}>
            <View style={styles.time}>
              <View style={styles.timeItem}>
                <Text style={styles.timeText}>시간</Text>
                <Text style={styles.timeNumber}>
                  {hour}:{minute}
                </Text>
              </View>
              <View style={styles.timeItem}>
                <Text style={styles.timeText}>거리</Text>
                <Text style={styles.timeNumber}>{distance}KM</Text>
              </View>
            </View>
            <Pressable
              style={styles.playbutton}
              onPress={handleOpenModal}
            >
              <View style={styles.line} />
              <View style={styles.line} />
            </Pressable>
          </View>
        </View>
      ) : (
        <LoadingSpinner />
      )}
      {isModal && (
        <ModalBackground>
          <TwoButtonAlert
            title="기록을 종료하시겠어요?"
            subTitle="한 번 종료하면 다시 이어서 기록할 수 없어요."
            whiteButtonText="종료하기"
            purpleButtonText="아니요"
            onPressWhiteButton={handleTerminate}
            onPressPurPleButton={() => {
              setIsModal(false);
              setIsPause(false);
            }}
          />
        </ModalBackground>
      )}
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 10,
  },

  timerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '100%',
    height: '26%',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    display: 'flex',
    rowGap: 20,
    alignItems: 'center',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
  },
  timeItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    rowGap: 10,
  },
  timeText: {
    color: gray['40'],
  },
  timeNumber: {
    fontSize: 32,
    fontWeight: '700',
  },

  playbutton: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    backgroundColor: '#7028FF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  line: {
    width: 8,
    height: '40%',
    backgroundColor: '#fff',
  },
  startMarker: {
    backgroundColor: '#6C5CE7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 200,
  },
  startText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
