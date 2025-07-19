import React from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface VerticalListProps<T> {
  data: T[];
  renderItem: (item: T & { index: number }) => React.ReactElement;
  isHorizontal?: boolean;
  handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  keyExtractor?: (item: T, index: number) => string;
}

function VerticalList<T>({
  data,
  renderItem,
  isHorizontal = false,
  handleScroll,
  keyExtractor,
}: VerticalListProps<T>) {
  return (
    <FlatList
      onScroll={handleScroll}
      horizontal={isHorizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => renderItem({ ...item, index })}
      keyExtractor={keyExtractor ?? ((_, index) => index.toString())}
    />
  );
}

export default VerticalList;
