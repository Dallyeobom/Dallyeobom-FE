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
      console.error('검색 내역 저장 실패(에러 발생)', error);
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
      console.error('검색 내역 fetch 실패(에러 발생)', error);
    }
  };

  const handleDeleteSearchText = async (targetIndex: number) => {
    try {
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
      console.error('검색 내역 삭제 실패(에러 발생)', error);
    }
  };

  const handleDeleteAllSearchText = async () => {
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
      console.error('검색 내역 삭제 실패(에러 발생)', error);
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
