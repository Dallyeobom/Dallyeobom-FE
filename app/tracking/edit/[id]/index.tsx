import { deleteCompleteCourse } from '@/api/course-complete/course-complete.service';
import OneButtonAlert from '@/components/alert/one-button-alert';
import TwoButtonAlert from '@/components/alert/two-button-alert';
import TrackingEditRecordCard from '@/components/card/tracking-edit-record-card';
import ModalBackground from '@/components/modal/modal-background';
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
    if (typeof id === 'string') {
      const result = await deleteCompleteCourse(Number(id));
      setIsDeleteCourseModal(false);
      setIsDeleteCourseResultModal(result);
    }
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
});
