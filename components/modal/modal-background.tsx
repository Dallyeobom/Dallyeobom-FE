import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ModalBackgroundProps {
  children: React.ReactNode;
}

function ModalBackground({ children }: ModalBackgroundProps) {
  return <View style={styles.container}>{children}</View>;
}

export default ModalBackground;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
});
