import React from 'react';
import { FlatList } from 'react-native';

interface VerticalListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  isHorizontal?: boolean;
}

function VerticalList<T>({
  data,
  renderItem,
  isHorizontal = false,
}: VerticalListProps<T>) {
  return (
    <FlatList
      horizontal={isHorizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item, index) => {
        // TODO: 에러 왜 나는지 이해가 필요함.. 흠
        // Property 'id' does not exist on type 'NonNullable<T>'.ts(2339)
        // return item?.id?.toString() || index.toString();
        return index.toString();
      }}
    />
  );
}

export default VerticalList;
