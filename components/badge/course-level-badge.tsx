import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface CourseLevelBadgeProps {
  level: string;
}

function CourseLevelBadge({ level }: CourseLevelBadgeProps) {
  const badgeStyle = getBadgeStyle(level);
  const textStyle = getTextStyle(level);
  return (
    <View style={[styles.container, badgeStyle]}>
      <Text style={[styles.text, textStyle]}>{level}</Text>
    </View>
  );
}

export default CourseLevelBadge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

const getBadgeStyle = (level: string): StyleProp<ViewStyle> => {
  switch (level) {
    case 'LOW':
      return { backgroundColor: 'rgba(0, 149, 255, 0.08)' };
    case 'MEDIUM':
      return { backgroundColor: 'rgba(0, 195, 33, 0.08)' };
    case 'HIGH':
      return { backgroundColor: 'rgba(255, 0, 0, 0.08)' };
    default:
      return { backgroundColor: 'rgba(0, 149, 255, 0.08)' };
  }
};
const getTextStyle = (level: string): StyleProp<TextStyle> => {
  switch (level) {
    case 'LOW':
      return { color: '#0095FF' };
    case 'MEDIUM':
      return { color: '#00C321' };
    case 'HIGH':
      return { color: '#FF0000' };
    default:
      return { color: '#0095FF' };
  }
};
