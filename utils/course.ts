export const formatDistance = (lengthInMeters: number) => {
  if (lengthInMeters >= 1000) {
    return `${(lengthInMeters / 1000).toFixed(1)}km`;
  }
  return `${lengthInMeters}m`;
};

export const formatTime = (intervalMs: number) => {
  const seconds = Math.floor(intervalMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
};
