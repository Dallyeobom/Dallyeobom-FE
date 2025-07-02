import { create } from 'zustand';

interface ModalStore {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalVisible: false,
  setModalVisible: (visible) => set({ modalVisible: visible }),
}));
