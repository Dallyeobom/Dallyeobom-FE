export const formatDistance = (lengthInMeters: number) => {
  if (lengthInMeters >= 1000) {
    return `${(lengthInMeters / 1000).toFixed(1)}km`;
  }
  return `${lengthInMeters}m`;
};
