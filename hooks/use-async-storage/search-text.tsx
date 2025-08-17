import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useSearchTextAsyncStorage = () => {
  const [savedSearchTextArr, setSavedSearchTextArr] = useState<string[]>([]);
  const [storageLength, setStorageLength] = useState(0);

  const handleSavedSearchText = async (item: string) => {
    try {
      const result = await AsyncStorage.getItem('searchText');
      if (!result) {
        await AsyncStorage.setItem('searchText', JSON.stringify([item]));
        setStorageLength(1);
      } else {
        const parsedResult = JSON.parse(result);
        if (Array.isArray(parsedResult)) {
          if (!parsedResult.includes(item)) {
            parsedResult.push(item);
          }
        }
        await AsyncStorage.setItem('searchText', JSON.stringify(parsedResult));
        setStorageLength(parsedResult.length);
      }
    } catch (error) {
      console.error('저장하는데 error가 났습니다', error);
    }
  };
  const handleGetSavedSearchText = async () => {
    try {
      const result = await AsyncStorage.getItem('searchText');
      if (result) {
        const parsedResult = JSON.parse(result);
        if (Array.isArray(parsedResult)) {
          setSavedSearchTextArr(parsedResult);
        }
      } else {
        setSavedSearchTextArr([]);
      }
    } catch (error) {
      console.error('꺼내는데 error가 났습니다', error);
    }
  };

  const handleDeleteSearchText = async (targetIndex: number) => {
    try {
      console.log('해당 아이템을 삭제합니다 ==>>>', targetIndex);
      const result = await AsyncStorage.getItem('searchText');
      if (result) {
        const parsedResult = JSON.parse(result);
        if (Array.isArray(parsedResult)) {
          const filteredArray = parsedResult.filter((_, index) => index !== targetIndex);
          await AsyncStorage.setItem('searchText', JSON.stringify(filteredArray));
          setStorageLength(filteredArray.length);
        }
      }
    } catch (error) {
      console.error('삭제하는데 에러가 났습니다', error);
    }
  };

  const handleDeleteAllSearchText = async () => {
    console.log('전체를 삭제합니다.');
    try {
      const result = await AsyncStorage.getItem('searchText');
      if (result) {
        const parsedResult = JSON.parse(result);
        if (Array.isArray(parsedResult)) {
          await AsyncStorage.removeItem('searchText');
          setStorageLength(0);
        }
      }
    } catch (error) {
      console.error('전체 삭제하는데 에러가 났습니다', error);
    }
  };

  useEffect(() => {
    handleGetSavedSearchText();
  }, [storageLength]);

  return {
    savedSearchTextArr,
    handleSavedSearchText,
    handleGetSavedSearchText,
    handleDeleteSearchText,
    handleDeleteAllSearchText,
  };
};
