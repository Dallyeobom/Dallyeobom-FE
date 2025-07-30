import { courseCompleteHistory } from '@/api/course-complete/course-complete.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

function RunningCourses() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setCurrentUserId(Number(userId));
  };
  const getMyRunningCourses = async () => {
    const data = await courseCompleteHistory({
      userId: 135,
    });
    console.log('나는 러닝 코쑤', data);
  };

  getUserId();

  useEffect(() => {
    getMyRunningCourses();
  }, [currentUserId]);
  return <Text>RunningCourses2222입니다아아</Text>;
}

export default RunningCourses;
