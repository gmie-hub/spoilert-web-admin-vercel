export interface SuccessState {
  openSuccess: boolean;
  setOpenSuccess: (value: boolean) => void;
}

export interface ApprovalState {
  openApproval: boolean;
  setOpenApproval: (value: boolean) => void;
}

export interface RejectionState {
  openRejection: boolean;
  setOpenRejection: (value: boolean) => void;
}

export interface ModalState {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export interface EditState {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}
export interface AddAdminChargeState {
  isAddAdminCharge: boolean;
  setIsAddAdminCharge: (value: boolean) => void;
}

export interface AdminChargesState {
  // Current admin charges data
  adminChargesData: any[];
  setAdminChargesData: (data: any[]) => void;

  // Settings ID for the transaction section
  settingsId: number | null;
  setSettingsId: (id: number) => void;

  // Edit state
  editingIndex: number | null;
  editingData: {
    max?: number;
    min?: number;
    charge?: number;
  } | null;
  setEditingData: (
    index: number | null,
    data?: { max?: number; min?: number; charge?: number }
  ) => void;

  // Actions
  addAdminCharge: (newCharge: {
    max: number;
    min: number;
    charge: number;
  }) => void;
  updateAdminCharge: (
    index: number,
    updatedData: { max?: number; min?: number; charge?: number }
  ) => void;
  deleteAdminCharge: (index: number) => void;
  resetEditingState: () => void;
}
