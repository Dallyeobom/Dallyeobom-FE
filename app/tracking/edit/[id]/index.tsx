import TrackingEditRecordCard from '@/components/card/tracking-edit-record-card';
import { gray } from '@/styles/color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function Index() {
  return (
    <View style={styles.container}>
      <TrackingEditRecordCard />
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
