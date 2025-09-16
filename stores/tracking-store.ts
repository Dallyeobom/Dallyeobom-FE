import { LocationType } from '@/app/tracking';
import { create } from 'zustand';

interface TrackingState {
  totalTrackingHour: number;
  handleTotalTrackingHour: (hour: number) => void;
  totalTrackingMinute: number;
  handleTotalTrackingMinute: (minute: number) => void;
  totalTrackingDistance: number;
  handleTotalTrackingDistance: (distance: number) => void;
  totalTrackingLocation: LocationType[];
  handleTotalTrackingLocation: (locationArr: LocationType[]) => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  totalTrackingHour: 0,
  handleTotalTrackingHour: (hour: number) => {
    set({ totalTrackingHour: hour });
  },
  totalTrackingMinute: 0,
  handleTotalTrackingMinute: (minute: number) => {
    set({ totalTrackingMinute: minute });
  },
  totalTrackingDistance: 0,
  handleTotalTrackingDistance: (distance: number) => {
    set({ totalTrackingDistance: distance });
  },
  totalTrackingLocation: [],
  handleTotalTrackingLocation: (locationArr: LocationType[]) => {
    set({ totalTrackingLocation: locationArr });
  },
}));
