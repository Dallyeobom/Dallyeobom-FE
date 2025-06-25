import LocationSettingModal from '@/components/location-setting-modal';
import LocationSettingText from '@/components/location-setting-text';
import { useLocationStore } from '@/stores/location-store';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const insets = useSafeAreaInsets();

  const { selectedLocation } = useLocationStore();
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.subContainer}>
        {!modalVisible && (
          <LocationSettingText
            selectedLocation={selectedLocation}
            setModalVisible={setModalVisible}
          />
        )}

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
    backgroundColor: '#153555',
  },

  subContainer: {
    flex: 1,
    backgroundColor: '#552f15',
    width: '100%',
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
