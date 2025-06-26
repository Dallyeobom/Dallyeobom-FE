import LocationSettingModal from '@/components/location-setting-modal';
import LocationSettingText from '@/components/location-setting-text';
import { useLocationStore } from '@/stores/location-store';
import { base } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const insets = useSafeAreaInsets();

  const { selectedLocation } = useLocationStore();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.subContainer}>
        {!modalVisible && selectedLocation ? (
          <View style={styles.locationTextContainer}>
            <LocationSettingText
              selectedLocation={selectedLocation}
              setModalVisible={setModalVisible}
            />
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                height: '100%',
                display: 'flex',
              }}
            >
              <View style={styles.section}>
                <Pressable style={styles.titleBarContainer}>
                  <View style={styles.titleBar}>
                    <Text style={styles.title}>근처 러너들이 달리는 코스</Text>
                    <Image source={require('@/assets/images/fire.png')} />
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="#9CA3AF"
                  />
                </Pressable>
                {/* 근처 러너들이 달리는 코스  swipe 형식으로 */}
              </View>

              {/* 인기코스 */}
              <View style={styles.section}>
                {/* 인기코스 텍스트 */}
                <View style={styles.titleBarContainer}>
                  <View style={styles.titleBar}>
                    <Text style={styles.title}>인기코스</Text>
                    <Image source={require('@/assets/images/thumbs-up.png')} />
                  </View>
                </View>
                {/* 이미지 */}
                <View>{/* <FlatList></FlatList> */}</View>
              </View>
            </View>
          </View>
        ) : (
          <LocationSettingModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
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
    backgroundColor: base['white'],
  },
  subContainer: {
    flex: 1,
    width: '100%',
  },
  locationTextContainer: {
    width: '100%',
  },
  section: {
    display: 'flex',
  },
  titleBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
