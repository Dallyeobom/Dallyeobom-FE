import { createMyCourse } from '@/api/course-complete/course-complete.service';
import { CourseCameraIcon } from '@/components/icons/TrackingIcon';
import { usePicturesRequest } from '@/hooks/use-picture-request';
import { useTrackingStore } from '@/stores/tracking-store';
import { base, main } from '@/styles/color';
import { getDifficultyLevel } from '@/utils/tracking';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncAlert from '../alert/async-alert';
import { CloseIcon, HeaderCloseIcon } from '../icons/CommonIcon';

type ImageData = {
  fileName: string;
  uri: string;
};

function TrackingRecordCard() {
  const router = useRouter();
  const [courseTitle, onChangeCourseTitle] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [courseDescription, onChangeCourseDescription] = useState('');
  const [courseImageUrlArr, setCourseImageUrlArr] = useState<ImageData[]>([]);
  const totalTrackingLocation = useTrackingStore((state) => state.totalTrackingLocation);

  const { handlePictures } = usePicturesRequest();

  const handleCourseTitleChange = (text: string) => {
    onChangeCourseTitle(text);
  };

  const handleCourseTitleDelete = () => {
    onChangeCourseTitle('');
  };

  const handleCourseDescriptionChange = (text: string) => {
    onChangeCourseDescription(text);
  };

  const handleCourseLevel = (level: string) => {
    setCourseLevel(level);
  };

  const handleCoursePictures = async () => {
    if (courseImageUrlArr.length === 5) {
      await AsyncAlert({ message: '최대 이미지 갯수입니다.' });
      return;
    }

    try {
      const result = await handlePictures();
      if (!result || !result.uri || !result.fileName || !result.mimeType) {
        await AsyncAlert({ message: '이미지 정보를 가져올 수 없습니다.' });
        return;
      }

      const { fileName, uri } = result;

      setCourseImageUrlArr((prev) => {
        const isAlreadyExist = prev.find((item) => item.fileName === fileName);
        if (!isAlreadyExist) {
          return [
            ...prev,
            {
              fileName,
              uri,
            },
          ];
        }
        return prev;
      });
    } catch (error) {
      await AsyncAlert({ message: '이미지 업로드하는데 실패하였습니다.' });
    }
  };

  const handleDeleteCourseImage = (fileName: string) => {
    setCourseImageUrlArr((prev) => {
      const filteredArr = prev.filter((item) => item.fileName !== fileName);
      return filteredArr;
    });
  };

  const handleComplete = async () => {
    console.log('작성완료!');
    const formData = new FormData();
    formData.append(
      'request',
      JSON.stringify({
        interval: 3600,
        path: totalTrackingLocation,
        courseVisibility: 'PUBLIC',
        courseCreateInfo: {
          description: courseDescription,
          name: courseTitle,
          courseLevel: getDifficultyLevel(courseLevel),
        },
      }),
    );
    const result = await createMyCourse(formData);
    console.log('코스 등록 결과입니다');
  };

  const courseLevelText = ['어려움', '보통', '쉬움'];

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
        <View style={styles.mapViewContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: totalTrackingLocation[0].latitude,
              longitude: totalTrackingLocation[0].longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={totalTrackingLocation[0]}
              title="Start"
            />

            <Polyline
              coordinates={totalTrackingLocation}
              strokeColor="#00BFFF"
              strokeWidth={4}
            />
          </MapView>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.section}>
            <Text style={styles.title}>제목</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleCourseTitleChange}
                value={courseTitle}
                placeholder="코스명"
                style={[
                  styles.input,
                  courseTitle.length > 0 && { borderColor: main[80] },
                ]}
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
              {courseLevelText.map((level, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.levelPress,
                    courseLevel === level && {
                      borderColor: main[10],
                      backgroundColor: main[10],
                    },
                  ]}
                  onPress={() => handleCourseLevel(level)}
                >
                  <Text
                    style={[
                      styles.levelText,
                      courseLevel === level && {
                        color: main[80],
                      },
                    ]}
                  >
                    {level}
                  </Text>
                </Pressable>
              ))}
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

            <View style={styles.pictureContainer}>
              <Pressable
                style={styles.cameraImageContainer}
                onPress={handleCoursePictures}
              >
                <CourseCameraIcon
                  width={24}
                  height={24}
                />
                <View style={styles.cameraImageCountContainer}>
                  <Text
                    style={
                      courseImageUrlArr.length > 0 && {
                        color: main[80],
                      }
                    }
                  >
                    {courseImageUrlArr.length}
                  </Text>
                  <Text>/</Text>
                  <Text>5</Text>
                </View>
              </Pressable>
              <View>
                <FlatList
                  data={courseImageUrlArr}
                  horizontal={true}
                  keyExtractor={(_, index) => String(index)}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.selectedImageItem}>
                        <Image
                          source={{ uri: item.uri }}
                          style={{
                            width: 60,
                            height: 60,
                            zIndex: 1,
                            position: 'absolute',
                          }}
                        />
                        <Pressable
                          style={styles.closeIconWrapper}
                          onPress={() => handleDeleteCourseImage(item.fileName)}
                        >
                          <CloseIcon
                            width={24}
                            height={24}
                          />
                        </Pressable>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
        <Pressable
          style={[
            styles.courseImageCompleteButton,
            courseTitle.length > 0 &&
              courseLevel.length > 0 &&
              courseDescription.length > 0 && {
                backgroundColor: main[80],
              },
          ]}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>작성 완료</Text>
        </Pressable>
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
    backgroundColor: base['white'],
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
    display: 'flex',
    rowGap: 20,

    padding: 10,
  },
  mapViewContainer: {
    height: 160,
    overflow: 'hidden',
    borderRadius: 16,
  },
  map: {
    width: '100%',
    height: '100%',
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
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  textarea: {
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  inputActiveBorder: {
    borderWidth: 1,
    borderColor: main[80],
    borderRadius: 8,
  },
  sectionContainer: {
    display: 'flex',
    rowGap: 10,
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
  pictureContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
  },

  cameraImageContainer: {
    backgroundColor: base['white'],
    width: 60,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  cameraImageCountContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  courseImageCompleteButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: main[10],
    paddingVertical: 13,
    borderRadius: 10,
    height: 56,
  },
  completeButtonText: {
    color: '#fff',
  },

  selectedImageItem: {
    width: 60,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
  },

  closeIconWrapper: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    top: -10,
  },
});
