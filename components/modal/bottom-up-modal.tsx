import { base } from '@/styles/color';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

interface BottomUpModalProps {
  children: React.ReactNode;
}

function BottomUpModal({ children }: BottomUpModalProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        console.log('크로즈');
      }}
      transparent={true}
      visible={true}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
}

export default BottomUpModal;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'rgba(134, 134, 134, 0.5)',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    width: '100%',
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    position: 'absolute',
    bottom: 0,
    backgroundColor: base['white'],
    paddingTop: 10,
  },
});
