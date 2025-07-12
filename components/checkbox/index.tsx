import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
interface PurPleCheckBoxProps {
  name: string;
  isCheck: boolean;
  onToggle: () => void;
}

function PurPleCheckBox({ name, isCheck, onToggle }: PurPleCheckBoxProps) {
  return (
    <Pressable onPress={onToggle}>
      <Image
        source={
          isCheck
            ? require('@/assets/images/checkbox-fill.png')
            : require('@/assets/images/checkbox-unfill.png')
        }
        style={styles.image}
      />
    </Pressable>
  );
}

export default PurPleCheckBox;

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
