import { main } from '@/styles/color';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CloseIcon, HeaderCloseIcon } from '../icons/CommonIcon';

function TrackingRecordCard() {
  const router = useRouter();
  const [courseTitle, onChangeCourseTitle] = useState('');
  const [courseDescription, onChangeCourseDescription] = useState('');

  const handleCourseTitleChange = (text: string) => {
    onChangeCourseTitle(text);
  };

  const handleCourseTitleDelete = () => {
    onChangeCourseTitle('');
  };

  const handleCourseDescriptionChange = (text: string) => {
    onChangeCourseDescription(text);
  };

  const handleCourseDescriptionDelete = () => {
    onChangeCourseDescription('');
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerRecordContainer}>
          <Text style={styles.title}>기록하기</Text>
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <HeaderCloseIcon
              width={24}
              height={24}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View></View>
        <View style={styles.sectionContainer}>
          <View style={styles.section}>
            <Text style={styles.title}>제목</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, courseTitle.length > 0 && styles.inputActiveBorder]}
                onChangeText={handleCourseTitleChange}
                value={courseTitle}
                placeholder="코스명"
              />
              {courseTitle.length > 0 && (
                <Pressable
                  style={styles.image}
                  onPress={handleCourseTitleDelete}
                >
                  <CloseIcon
                    width={24}
                    height={24}
                  />
                </Pressable>
              )}
            </View>
          </View>

          {/* 코스 난이도 */}
          <View style={styles.section}>
            <Text style={styles.title}>코스 난이도</Text>

            <View style={styles.levelContainer}>
              <Pressable style={styles.levelPress}>
                <Text style={styles.levelText}>어려움</Text>
              </Pressable>
              <Pressable style={styles.levelPress}>
                <Text style={styles.levelText}>보통</Text>
              </Pressable>
              <Pressable style={styles.levelPress}>
                <Text style={styles.levelText}>쉬움</Text>
              </Pressable>
            </View>
          </View>

          {/* 코스 설명 */}
          <View style={styles.section}>
            <Text style={styles.title}>코스 설명</Text>
            <View style={styles.inputContainer}>
              <TextInput
                multiline
                numberOfLines={4}
                textAlignVertical="top" // 텍스트를 위에서부터 시작
                style={[
                  styles.textarea,
                  courseDescription.length > 0 && styles.inputActiveBorder,
                ]}
                onChangeText={handleCourseDescriptionChange}
                value={courseDescription}
                placeholder="코스 설명"
              />
            </View>
          </View>

          {/* 코스 사진 */}
          <View style={styles.section}>
            <Text style={styles.title}>코스 사진</Text>

            <View style={styles.inputContainer}></View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default TrackingRecordCard;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: base['white'],
    backgroundColor: 'green',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },

  levelContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
  },
  headerRecordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  mainContainer: {
    backgroundImage: 'blue',
  },
  levelPress: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 9,
    backgroundColor: '#F4F4F4',
  },
  levelText: {
    textAlign: 'center',
    color: '#868686',
  },
  input: {
    height: 52,
    borderWidth: 1,
    padding: 10,
    borderColor: '#cccccc',
    borderRadius: 8,
  },
  textarea: {
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    // padding: 10,
    // fontSize: 16,
  },
  inputActiveBorder: {
    borderWidth: 1,
    borderColor: main[80],
    borderRadius: 8,
  },
  sectionContainer: {
    display: 'flex',
    rowGap: 20,
  },

  section: {
    display: 'flex',
    rowGap: 10,
  },
  image: {
    position: 'absolute',
    width: 24,
    height: 24,
    top: '30%',
    right: 10,
  },
});
