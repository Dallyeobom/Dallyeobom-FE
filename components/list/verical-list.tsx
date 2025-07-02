import React from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface VerticalListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  isHorizontal?: boolean;
  handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

function VerticalList<T>({
  data,
  renderItem,
  isHorizontal = false,
  handleScroll,
}: VerticalListProps<T>) {
  return (
    <FlatList
      onScroll={handleScroll}
      horizontal={isHorizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item, index) => {
        // TODO: 아래 에러 확인 필요
        // Property 'id' does not exist on type 'NonNullable<T>'.ts(2339)
        // return item?.id?.toString() || index.toString();
        return index.toString();
      }}
    />
  );
}

export default VerticalList;
