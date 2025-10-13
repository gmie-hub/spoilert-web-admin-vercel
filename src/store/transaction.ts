import { create } from "zustand";

import type { AddAdminChargeState } from "./type";

export const useAddAdminChargeStore = create<AddAdminChargeState>((set) => ({
  isAddAdminCharge: false,
  setIsAddAdminCharge: (value) => {
    set({ isAddAdminCharge: value });
  },
}));
