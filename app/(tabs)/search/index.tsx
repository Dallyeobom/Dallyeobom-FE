import { main } from '@/styles/color';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Search() {
  const [searchText, onChangSearchText] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNicknameChange = (text: string) => {
    onChangSearchText(text);
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Pressable
        onPress={() => {
          console.log('하이');
          router.replace('/(tabs)');
        }}
      >
        <Image source={require('@/assets/images/back.png')} />
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, searchText.length > 0 && styles.inputActiveBorder]}
          onChangeText={handleNicknameChange}
          value={searchText}
          placeholder="동명(읍,면) 입력 (ex 서초동)"
        />
        {searchText.length > 0 && (
          <Pressable
            style={styles.image}
            onPress={() => {}}
          >
            <Image source={require('@/assets/images/close.png')} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    justifyContent: 'center',
  },

  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    flex: 0.9,
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
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
