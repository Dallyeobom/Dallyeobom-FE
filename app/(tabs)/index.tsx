import LocationSettingModal from '@/components/location-setting-modal';
import { useLocationStore } from '@/stores/location-store';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Index() {
  const { selectedLocation } = useLocationStore();
  const [modalVisible, setModalVisible] = useState(false);

  const getLocationDisplay = (location: string) => {
    if (!location) return '위치 설정';
    const parts = location.split(' ');
    const dongPart = parts.find((part) => part.includes('동'));

    return dongPart ? `${dongPart} 근처` : `${location} 근처`;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <LocationSettingModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}

export default Index;

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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
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
