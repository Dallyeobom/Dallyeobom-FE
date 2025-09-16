import { base } from '@/styles/color';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

interface BottomUpModalProps {
  children: React.ReactNode;
  close?: () => void;
  borderRadius?: number;
  height?: number | `${number}%`;
}

export default function BottomUpModal({
  children,
  close,
  borderRadius = 26,
  height,
}: BottomUpModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={true}
      onRequestClose={close}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <Pressable
          style={styles.backdrop}
          onPress={close}
        />
        <View
          style={[
            styles.modalContent,
            {
              height: height ? height : null,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
          ]}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
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
