import { base, main } from '@/styles/color';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const [nickname, onChangeNickname] = useState('');

  const insets = useSafeAreaInsets();
  const handleNicknameChange = (text: string) => {
    onChangeNickname(text);
  };
  const handlePress = () => {};
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>반갑습니다!</Text>
          <Text style={styles.title}>어떻게 불러드릴까요?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, nickname.length > 0 && styles.inputActiveBorder]}
            onChangeText={handleNicknameChange}
            value={nickname}
            placeholder="닉네임 입력"
            keyboardType="numeric"
          />
          {nickname.length > 0 && (
            <Image
              style={styles.image}
              source={require('@/assets/images/close.png')}
            />
          )}
        </View>
      </View>

      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.nicknameButton,
          {
            backgroundColor: nickname.length > 0 ? main[80] : main[10],
          },
        ]}
      >
        <Text style={styles.buttonText}>가입하기</Text>
      </Pressable>
    </View>
  );
}
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: base.white,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  nicknameButton: {
    height: 56,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: base.white,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
  },

  input: {
    height: 52,
    borderWidth: 1,
    padding: 10,
    borderColor: '#cccccc',
    borderRadius: 8,
  },
  inputActiveBorder: {
    borderWidth: 1,
    borderColor: main[80],
    borderRadius: 8,
  },
  image: {
    position: 'absolute',
    width: 24,
    height: 24,
    top: '30%',
    right: 10,
  },
});
