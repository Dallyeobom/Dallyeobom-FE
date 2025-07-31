import { base, main } from '@/styles/color';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

function NickNameEditCard() {
  const [nickname, onChangeNickname] = useState('');

  const handleNicknameChange = () => {};

  const handleDelete = () => {};

  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>닉네임 설정</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, nickname.length > 0 && styles.inputActiveBorder]}
          onChangeText={handleNicknameChange}
          value={nickname}
          placeholder="닉네임 입력"
        />
        {nickname.length > 0 && (
          <Pressable
            style={styles.image}
            onPress={handleDelete}
          >
            <Image source={require('@/assets/images/close.png')} />
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={handlePress}
        style={[
          styles.button,
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

export default NickNameEditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 18,
    marginVertical: 10,
    rowGap: 20,
    zIndex: 100,
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
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
  nicknameLengthText: {
    alignSelf: 'flex-end',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: base.white,
    fontWeight: '500',
  },
});
