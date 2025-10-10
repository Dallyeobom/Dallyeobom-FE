import { deleteCompleteCourse } from '@/api/course-complete/course-complete.service';
import OneButtonAlert from '@/components/alert/one-button-alert';
import TwoButtonAlert from '@/components/alert/two-button-alert';
import TrackingEditRecordCard from '@/components/card/tracking-edit-record-card';
import ModalBackground from '@/components/modal/modal-background';
import { gray } from '@/styles/color';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

function Index() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [isDeleteCourseModal, setIsDeleteCourseModal] = useState(false);
  const [isEditCourseModal, setIsEditCourseModal] = useState(false);
  const [isDeleteCourseResultModal, setIsDeleteCourseResultModal] = useState<
    number | null
  >(null);

  const handleDeleteCourse = async (id: number) => {
    const result = await deleteCompleteCourse(Number(id));
    setIsDeleteCourseModal(false);
    setIsDeleteCourseResultModal(result);
  };

  const handleEditCourse = async (id: number) => {
    alert('개발중');
  };

  return (
    <View style={styles.container}>
      <TrackingEditRecordCard
        setIsDeleteCourseModal={setIsDeleteCourseModal}
        setIsEditCourseModal={setIsEditCourseModal}
      />
      {isDeleteCourseModal && !isEditCourseModal && (
        <ModalBackground>
          <TwoButtonAlert
            title="코스를 삭제하시겠습니까?"
            subTitle="입력한 정보가 모두 사라져요"
            whiteButtonText="아니오"
            purpleButtonText="삭제하기"
            onPressWhiteButton={() => {
              setIsDeleteCourseModal(false);
            }}
            onPressPurPleButton={() => handleDeleteCourse(Number(id))}
          />
        </ModalBackground>
      )}
      {!isDeleteCourseModal && isEditCourseModal && (
        <ModalBackground>
          <TwoButtonAlert
            title="리뷰 수정을 그만두시겠어요?"
            subTitle="다시 이어서 수정할 수 없어요"
            whiteButtonText="아니오"
            purpleButtonText="계속 수정하기"
            onPressWhiteButton={() => {
              setIsEditCourseModal(false);
            }}
            onPressPurPleButton={() => {
              handleEditCourse(Number(id));
            }}
          />
        </ModalBackground>
      )}
      {/* 삭제 결과값 모달 */}
      {isDeleteCourseResultModal && (
        <ModalBackground>
          <OneButtonAlert
            title="코스가 삭제가 되었습니다."
            whiteButtonText="확인"
            onPressWhiteButton={() => {
              setIsDeleteCourseResultModal(null);
              router.push('/(tabs)');
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
