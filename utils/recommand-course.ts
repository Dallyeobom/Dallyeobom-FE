export const getRecommandationSearchText = (data: any) => {
  return data.map((item: any) => item.name);
};

export const getRecommandationSearchText2 = (data: any) => {
  return data.items.map((item: any) => item.name);
};
