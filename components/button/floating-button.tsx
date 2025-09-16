import { base, main } from '@/styles/color';
import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

interface FloatingButtonProps {
  buttonText?: string;
  width: number;
  height: number;
  onPress: () => void;
}

function FloatingButton({ buttonText, width, height, onPress }: FloatingButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          width: width,
          height: height,
          left: '50%',
          transform: [{ translateX: -(width / 2) }],
        },
      ]}
    >
      <Image
        source={require('@/assets/images/runner.png')}
        style={styles.image}
      />
      {buttonText && <Text style={styles.text}>{buttonText}</Text>}
    </Pressable>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: main['80'],
    columnGap: 4,
    bottom: 80,
    paddingHorizontal: 14,
    borderRadius: 100,
  },
  text: {
    color: base['white'],
    fontWeight: 600,
  },
  image: {
    width: 22,
    height: 21,
  },
});
