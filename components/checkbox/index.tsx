import { useCheckBoxStore } from '@/stores/checkbox-store';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
interface PurPleCheckBoxProps {
  id: string;
  isCheck: boolean;
}

function PurPleCheckBox({ id, isCheck }: PurPleCheckBoxProps) {
  const { isAllKey, handleAllKey } = useCheckBoxStore((state) => ({
    isAllKey: state.isAllKey,
    handleAllKey: state.handleAllKey,
  }));
  const { isServiceKey, handleServiceKey } = useCheckBoxStore((state) => ({
    isServiceKey: state.isServiceKey,
    handleServiceKey: state.handleServiceKey,
  }));

  return (
    <Pressable
      onPress={() => {
        if (id === 'all') {
          handleAllKey(!isAllKey);
        }
        if (id === 'service') {
          handleServiceKey(!isServiceKey);
        }
      }}
    >
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
