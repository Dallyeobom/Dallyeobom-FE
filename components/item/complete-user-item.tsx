import { base, gray } from '@/styles/color';
import { CourseRankResponse } from '@/types/course';
import { formatTime } from '@/utils/course';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NoDataItem from './no-data-item';

const renderRankIcon = (index: number) => {
  if (index < 3) {
    const trophyColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    return (
      <View style={styles.userRankNumber}>
        <Ionicons
          name="trophy"
          size={24}
          color={trophyColors[index]}
        />
      </View>
    );
  }
  return (
    <View style={styles.userRankNumber}>
      <Text style={styles.rankNumberText}>{index + 1}</Text>
    </View>
  );
};
export const renderCompletedUsers = (courseRanking: CourseRankResponse | null) => {
  if (!courseRanking || !courseRanking.items || courseRanking.items.length === 0) {
    return (
      <View style={[styles.noDataCourseContainer]}>
        <NoDataItem source={require('@/assets/images/priority-high.png')} />
        <Text style={styles.noDataText}>이 코스를 완주하고 랭킹에 도전하세요</Text>
      </View>
    );
  }

  return (
    <View style={styles.completedUsersContainer}>
      <Text style={styles.sectionTitle}>이 코스를 완주한 유저</Text>
      {courseRanking.items.map((rankItem, index) => (
        <View
          key={rankItem.user.id}
          style={styles.userItem}
        >
          {renderRankIcon(index)}
          <Image
            source={{
              uri:
                rankItem.user.profileImage ||
                'https://randomuser.me/api/portraits/men/1.jpg',
            }}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text
              style={styles.userName}
              numberOfLines={1}
            >
              {rankItem.user.nickname}
            </Text>
          </View>
          <Text style={[styles.userTime, index < 3 && styles.userTimeBold]}>
            {formatTime(rankItem.interval)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base.white,
  },
  completedUsersContainer: {
    padding: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '400',
    color: gray[80],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: base.white,
    zIndex: 1000,
  },
  userRankNumber: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: gray[100],
  },
  noDataCourseContainer: {
    marginVertical: 25,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  noDataText: {
    color: gray[30],
    fontSize: 13,
  },
  challengeButton: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: gray[15],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: base.white,
    marginTop: 12,
  },
  challengeButtonText: {
    fontSize: 14,
    color: gray[80],
    fontWeight: '500',
  },
  userTime: {
    fontSize: 15,
    color: gray[100],
  },
  userTimeBold: {
    fontWeight: '700',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
});
