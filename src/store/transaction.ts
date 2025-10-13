import { create } from "zustand";

import type { AddAdminChargeState, AdminChargesState } from "./type";

export const useAddAdminChargeStore = create<AddAdminChargeState>((set) => ({
  isAddAdminCharge: false,
  setIsAddAdminCharge: (value) => {
    set({ isAddAdminCharge: value });
  },
}));

export const useAdminChargesStore = create<AdminChargesState>((set, get) => ({
  // Current admin charges data
  adminChargesData: [],
  setAdminChargesData: (data) => {
    set({ adminChargesData: data });
  },

  // Settings ID for the transaction section
  settingsId: null,
  setSettingsId: (id) => {
    set({ settingsId: id });
  },

  // Edit state
  editingIndex: null,
  editingData: null,
  setEditingData: (index, data) => {
    set({
      editingIndex: index,
      editingData: data || null,
    });
  },

  // Actions
  addAdminCharge: (newCharge) => {
    const { adminChargesData } = get();
    set({
      adminChargesData: [...adminChargesData, newCharge],
    });
  },

  updateAdminCharge: (index, updatedData) => {
    const { adminChargesData } = get();
    const updatedCharges = adminChargesData.map((charge, i) =>
      i === index ? { ...charge, ...updatedData } : charge
    );
    set({ adminChargesData: updatedCharges });
  },

  deleteAdminCharge: (index) => {
    const { adminChargesData } = get();
    const filteredCharges = adminChargesData.filter((_, i) => i !== index);
    set({ adminChargesData: filteredCharges });
  },

  resetEditingState: () => {
    set({
      editingIndex: null,
      editingData: null,
    });
  },
}));
