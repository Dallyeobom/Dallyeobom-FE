import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LocationCoords {
  lat: number;
  lng: number;
}

interface LocationStore {
  selectedLocation: string;
  selectedCoords: LocationCoords | null;
  setSelectedLocation: (location: string, coords: LocationCoords) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      selectedLocation: '',
      selectedCoords: null,
      setSelectedLocation: (location, coords) =>
        set({ selectedLocation: location, selectedCoords: coords }),
      clearLocation: () => set({ selectedLocation: '', selectedCoords: null }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
