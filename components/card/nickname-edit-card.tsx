import { changeNickname } from '@/api/user/user.service';
import { base, main } from '@/styles/color';
import { showErrorAlert } from '@/utils/error-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncAlert from '../alert/async-alert';

interface NicknameEditCardProps {
  newNickname: string;
  onChangeNewNickname: (nickname: string) => void;
  setIsNicknameChangeSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNicknameModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function NicknameEditCard({
  newNickname,
  onChangeNewNickname,
  setIsNicknameChangeSaved,
  setIsNicknameModal,
}: NicknameEditCardProps) {
  const handleNicknameChange = (text: string) => {
    onChangeNewNickname(text);
  };

  const handleDelete = () => {
    onChangeNewNickname('');
  };

  const handleNicknameSave = async (nickname: string) => {
    try {
      const statusCode = await changeNickname(nickname);

      if (statusCode === 200) {
        await AsyncStorage.setItem('nickname', nickname);
        setIsNicknameChangeSaved(true);
        await AsyncAlert({ message: '닉네임 변경에 성공하였습니다.' });
        setIsNicknameChangeSaved(false);
        setIsNicknameModal(false);
      } else if (statusCode === 409) {
        Alert.alert('이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
      }
    } catch (error) {
      showErrorAlert(error, 'NICKNAME_CHANGE', '닉네임 변경 실패');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>닉네임 설정</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, newNickname?.length > 0 && styles.inputActiveBorder]}
          onChangeText={handleNicknameChange}
          value={newNickname}
          placeholder="닉네임 입력"
        />
        {newNickname.length > 0 && (
          <Pressable
            style={styles.image}
            onPress={handleDelete}
          >
            <Image source={require('@/assets/images/close.png')} />
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={() => handleNicknameSave(newNickname)}
        style={[
          styles.button,
          {
            backgroundColor: newNickname.length > 0 ? main[80] : main[10],
          },
        ]}
      >
        <Text style={styles.buttonText}>저장하기</Text>
      </Pressable>
    </View>
  );
}

export default NicknameEditCard;

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
