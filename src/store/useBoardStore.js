import { create } from 'zustand';

export const useBoardStore = create((set) => ({
    activeBoardId: null,
    setActiveBoardId: (id) => set({ activeBoardId: id }),

    isCreateBoardModalOpen: false,
    setCreateBoardModalOpen: (isOpen) => set({ isCreateBoardModalOpen: isOpen }),
}));
