import { create } from "zustand";

import type { ApprovalState, SuccessState } from "./type";

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
