import TwoButtonAlert from '@/components/alert/two-button-alert';
import TrackingRecordCard from '@/components/card/tracking-record-card';
import { PinIcon } from '@/components/icons/TrackingIcon';
import CoursePath from '@/components/line/course-path';
import BottomUpModal from '@/components/modal/bottom-up-modal';
import ModalBackground from '@/components/modal/modal-background';
import { useTrackingStore } from '@/stores/tracking-store';
import { gray } from '@/styles/color';
import { getTodayDate } from '@/utils/tracking';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

function Index() {
  const [isModal, setIsModal] = useState(false);
  const [isRecordModal, setIsRecordModal] = useState(false);
  const router = useRouter();

  const totalTrackingHour = useTrackingStore((state) => state.totalTrackingHour);
  const totalTrackingMinute = useTrackingStore((state) => state.totalTrackingMinute);
  const totalTrackingDistance = useTrackingStore((state) => state.totalTrackingDistance);
  const totalTrackingLocation = useTrackingStore((state) => state.totalTrackingLocation);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleRecord = () => {
    setIsRecordModal(true);
  };
  const { month, day } = getTodayDate();

  const renderPolyLine = CoursePath();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.date}>
          {month}월 {day}일 기록
        </Text>
        <View style={styles.timerContainer}>
          <View style={styles.timeItem}>
            <Text style={styles.timeText}>시간</Text>
            <Text style={styles.timeNumber}>
              {totalTrackingHour}:{totalTrackingMinute}
            </Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeText}>거리</Text>
            <Text style={styles.timeNumber}>{totalTrackingDistance}km</Text>
          </View>
        </View>
        <View style={styles.mapViewContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: totalTrackingLocation[0].latitude,
              longitude: totalTrackingLocation[0].longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={totalTrackingLocation[0]}
              title="Start"
            />
            <Marker
              coordinate={totalTrackingLocation[totalTrackingLocation.length - 1]}
              title="End"
            >
              <PinIcon
                width={35}
                height={35}
              />
            </Marker>
            {renderPolyLine(totalTrackingLocation)}
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.whiteButton}
            onPress={handleOpenModal}
          >
            <Text style={styles.whiteButtonText}>나가기</Text>
          </Pressable>
          <Pressable
            style={styles.purpleButton}
            onPress={handleRecord}
          >
            <Text style={styles.purpleButtonText}>기록하기</Text>
          </Pressable>
        </View>
      </View>
      {isModal && (
        <ModalBackground>
          <TwoButtonAlert
            title="정말 기록을 남기지 않으시겠어요?"
            subTitle="‘내 기록’에서 언제든 다시 작성하실 수 있어요"
            whiteButtonText="나가기"
            purpleButtonText="취소"
            onPressWhiteButton={() => {
              router.push('/(tabs)');
            }}
            onPressPurPleButton={() => {
              setIsModal(false);
            }}
          />
        </ModalBackground>
      )}
      {isRecordModal && (
        <BottomUpModal
          borderRadius={0}
          height="100%"
          close={() => setIsRecordModal(false)}
        >
          <TrackingRecordCard />
        </BottomUpModal>
      )}
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  innerContainer: {
    paddingHorizontal: 20,
  },

  timerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 34,
  },
  date: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  timeItem: {
    flex: 1,
    rowGap: 6,
  },
  timeText: {
    color: gray['40'],
  },
  timeNumber: {
    fontSize: 28,
    fontWeight: '700',
  },
  mapViewContainer: {
    height: '64%',
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 30,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },

  whiteButton: {
    backgroundColor: '#F4F4F4',
    width: '50%',
    borderRadius: 16,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteButtonText: {
    color: '#121212',
    fontSize: 16,
  },
  purpleButton: {
    backgroundColor: '#7028FF',
    width: '50%',
    borderRadius: 16,
    height: 56,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
