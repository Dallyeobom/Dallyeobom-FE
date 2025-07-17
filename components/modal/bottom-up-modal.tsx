import { base } from '@/styles/color';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  close: () => void;
}

export default function BottomUpModal({ children, close }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={true}
      onRequestClose={close}
    >
      <Pressable style={styles.backdrop} onPress={close} />

      <View style={styles.modalContent}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: base.white,
    paddingTop: 10,
  },
});
