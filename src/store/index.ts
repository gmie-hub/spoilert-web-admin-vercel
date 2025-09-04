import { create } from "zustand";

import type {
  ApprovalState,
  EditState,
  ModalState,
  RejectionState,
  SuccessState,
} from "./type";

export const useSuccessStore = create<SuccessState>((set) => ({
  openSuccess: false,
  setOpenSuccess: (value) => {
    set({ openSuccess: value });
  },
}));

export const useApprovalStore = create<ApprovalState>((set) => ({
  openApproval: false,
  setOpenApproval: (value) => {
    set({ openApproval: value });
  },
}));

export const useRejectionStore = create<RejectionState>((set) => ({
  openRejection: false,
  setOpenRejection: (value) => {
    set({ openRejection: value });
  },
}));

export const useModalStore = create<ModalState>((set) => ({
  openModal: false,
  setOpenModal: (value) => {
    set({ openModal: value });
  },
}));

export const useEditStore = create<EditState>((set) => ({
  isEdit: false,
  setIsEdit: (value) => {
    set({ isEdit: value });
  },
}));