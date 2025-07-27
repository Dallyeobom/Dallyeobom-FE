import { base } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LocationSettingModalProps {
  selectedLocation: string;
  setModalVisible: (visible: boolean) => void;
}

export default function LocationSettingText({
  selectedLocation,
  setModalVisible,
}: LocationSettingModalProps) {
  const getLocationDisplay = (location: string) => {
    if (!location) return '위치 설정';
    const parts = location.split(' ');
    const dongPart = parts.find((part) => part.includes('동'));

    return dongPart ? `${dongPart} 근처` : `${location} 근처`;
  };
  return (
    <TouchableOpacity
      style={styles.locationButton}
      onPress={() => setModalVisible(true)}
      activeOpacity={0.7}
    >
      <Text style={styles.locationText}>{getLocationDisplay(selectedLocation)}</Text>
      <Ionicons
        name="chevron-down"
        size={25}
        color="#9CA3AF"
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: base['white'],
    paddingHorizontal: 20,
    paddingVertical: 16,
    minWidth: 180,
  },
  locationText: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  chevronIcon: {
    marginTop: 4,
  },
});
