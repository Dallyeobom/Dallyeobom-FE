import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

interface VerticalListProps<T> {
  data: T[];
  renderItem: (item: T & { index: number }) => React.ReactElement;
  isHorizontal?: boolean;
  handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  keyExtractor?: (item: T, index: number) => string;
  fetchMoreCallback?: () => void;
}

function VerticalList<T>({
  data,
  renderItem,
  isHorizontal = false,
  handleScroll,
  keyExtractor,
  fetchMoreCallback,
}: VerticalListProps<T>) {
  const renderFooter = () => {
    return <ActivityIndicator style={{ marginVertical: 16 }} />;
  };
  return (
    <FlatList
      data={data}
      onScroll={handleScroll}
      horizontal={isHorizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => renderItem({ ...item, index })}
      keyExtractor={keyExtractor ?? ((_, index) => index.toString())}
      // for 무한 스크롤을 위한 attribute
      onEndReached={fetchMoreCallback}
      onEndReachedThreshold={0.4}
      ListFooterComponent={renderFooter}
    />
  );
}

export default VerticalList;
