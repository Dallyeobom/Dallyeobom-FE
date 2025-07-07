import { create } from 'zustand';

interface CheckBoxStore {
  isAllKey: boolean;
  handleAllKey: (check: boolean) => void;
  isServiceKey: boolean;
  handleServiceKey: (check: boolean) => void;
  isPersonalKey: boolean;
  handlePersonalKey: (check: boolean) => void;
  isOptionalKey: boolean;
  handleOptionalKey: (check: boolean) => void;
}

export const useCheckBoxStore = create<CheckBoxStore>((set) => ({
  isAllKey: false,
  handleAllKey: (check) => set({ isAllKey: check }),

  isServiceKey: false,
  handleServiceKey: (check) => set({ isServiceKey: check }),

  isPersonalKey: false,
  handlePersonalKey: (check) => set({ isPersonalKey: check }),

  isOptionalKey: false,
  handleOptionalKey: (check) => set({ isOptionalKey: check }),
}));
