import TwoButtonAlert from '@/components/alert/two-button-alert';
import LoadingSpinner from '@/components/loading';
import ModalBackground from '@/components/modal/modal-background';
import { gray } from '@/styles/color';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

interface LocationType {
  latitude: number;
  longitude: number;
}

function Index() {
  const [location, setLocation] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  useEffect(() => {
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
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log('useEFfect실행');
    const IntervalId = setInterval(() => {
      setMinute((prev) => prev + 1);
    }, 60000);

    return () => {
      console.log('끗!===>> INTERVALID', IntervalId);
      clearInterval(IntervalId);
    };
  }, [minute]);

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

            <Polyline
              coordinates={location}
              strokeColor="#00BFFF"
              strokeWidth={4}
            />
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
                <Text style={styles.timeNumber}>15.2KM</Text>
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
        //   구글 맵 나오기전까지 LOADING
        <LoadingSpinner />
      )}
      {isModal && (
        <ModalBackground>
          <TwoButtonAlert
            title="기록을 종료하시겠어요?"
            subTitle="한 번 종료하면 다시 이어서 기록할 수 없어요."
            whiteButtonText="종료하기"
            purpleButtonText="아니요"
            onPressPurPleButton={() => {
              setIsModal(false);
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
});
