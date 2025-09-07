import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TwoButtonAlertProps {
  title: string;
  subTitle: string;
  whiteButtonText: string;
  purpleButtonText: string;
  onPressWhiteButton?: () => void;
  onPressPurPleButton?: () => void;
}

function TwoButtonAlert({
  title,
  subTitle,
  whiteButtonText,
  purpleButtonText,
  onPressWhiteButton,
  onPressPurPleButton,
}: TwoButtonAlertProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subTitleText}>{subTitle}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.whiteButton}
          onPress={onPressWhiteButton}
        >
          <Text style={styles.whiteButtonText}>{whiteButtonText}</Text>
        </Pressable>
        <Pressable
          style={styles.purpleButton}
          onPress={onPressPurPleButton}
        >
          <Text style={styles.purpleButtonText}>{purpleButtonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default TwoButtonAlert;

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    display: 'flex',
    rowGap: 24,
    margin: 'auto',
  },
  textContainer: {
    display: 'flex',
    marginTop: 32,

    alignItems: 'center',
    rowGap: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
  },
  subTitleText: {
    color: '#868686',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',

    columnGap: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteButton: {
    backgroundColor: '#F4F4F4',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
  },
  whiteButtonText: {
    color: '#121212',
    fontSize: 16,
    textAlign: 'center',
  },
  purpleButton: {
    backgroundColor: '#7028FF',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
  },
  purpleButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
