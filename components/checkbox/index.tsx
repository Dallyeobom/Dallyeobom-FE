import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
interface PurPleCheckBoxProps {
  type: string;
  isCheck: boolean;
  onToggle: (e:string) => void;
}

function PurPleCheckBox({ type, isCheck, onToggle }: PurPleCheckBoxProps) {
  return (
    <Pressable onPress={() => onToggle(type)}>
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
