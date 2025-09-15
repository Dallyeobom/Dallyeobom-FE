import { gray } from '@/styles/color';
import { CourseDetailResponse } from '@/types/course';
import { formatDistance } from '@/utils/course';
import { getDifficultyText } from '@/utils/difficulty';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CourseInfoCardProps {
  courseData: CourseDetailResponse;
}

function CourseInfoCard({ courseData }: CourseInfoCardProps) {
  const renderCourseInfo = () => {
    if (!courseData) return null;

    return (
      <View
        style={styles.courseInfoContainer}
        // {...PanResponder.panHandlers}
      >
        <View style={styles.courseInfoHeader}>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficulty}>
              {getDifficultyText(courseData.courseLevel)}
            </Text>
          </View>
          <Text style={styles.courseTitle}>{courseData.name}</Text>
          <Text style={styles.courseDescription}>{courseData.description}</Text>
          <Text style={styles.distance}>{formatDistance(courseData.length)}</Text>
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{renderCourseInfo()}</View>;
}

export default CourseInfoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    height: '50%',
    zIndex: 10,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  courseInfoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  courseInfoHeader: {
    gap: 8,
    borderBottomColor: gray[15],
    borderBottomWidth: 1,
    paddingBottom: 32,
  },
  difficultyBadge: {
    backgroundColor: '#FF000014',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficulty: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: gray[100],
  },
  courseDescription: {
    fontSize: 14,
    color: gray[40],
    lineHeight: 20,
  },
  distance: {
    fontSize: 20,
    fontWeight: '700',
    color: gray[100],
  },
});
