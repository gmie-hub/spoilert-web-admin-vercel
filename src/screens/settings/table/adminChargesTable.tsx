import type { FC } from "react";

import { HStack, IconButton, Image, Table } from "@chakra-ui/react";

import { Modal } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import { useUpdateSettingsMutation } from "@spt/hooks/api/useUpdateSettingsMutation";
import {
  useAddAdminChargeStore,
  useAdminChargesStore,
} from "@spt/store/transaction";
import type { Metadata3 } from "@spt/types/settings";
import type { TableBodyProps } from "@spt/utils/types";

const AdminChargesTable: FC<TableBodyProps> = ({ items }) => {
  const {
    setEditingData,
    deleteAdminCharge,
    setAdminChargesData,
    adminChargesData,
    settingsId,
  } = useAdminChargesStore();
  const setIsAdminCharge = useAddAdminChargeStore(
    (state) => state.setIsAddAdminCharge
  );

  const { isUpdateLoading, updateSettingsHandler } = useUpdateSettingsMutation(
    settingsId || 0
  );

  const handleEdit = (index: number, item: Metadata3) => {
    // Ensure the store has the latest table data before editing
    if (Array.isArray(items)) {
      setAdminChargesData(items as Metadata3[]);
    }
    setEditingData(index, {
      max: item.max || undefined,
      min: item.min,
      charge: item.charge,
    });

    setIsAdminCharge(true);
  };

  const handleDelete = async (index: number) => {
    // Build filtered metadata and send full array so others are preserved
    const source =
      Array.isArray(adminChargesData) && adminChargesData.length > 0
        ? adminChargesData
        : (items as Metadata3[]);

    const filtered = (source || [])
      .filter((_, i) => i !== index)
      .map((c) => ({ max: c.max, min: c.min, charge: c.charge }));

    await updateSettingsHandler({ metadata: filtered });

    // Update local store after successful request
    deleteAdminCharge(index);
  };

  return (
    <>
      {items?.map((item: Metadata3, index: number) => (
        <Table.Row key={index} py="16">
          <Table.Cell>{`₦${item?.min}-₦${item?.max}`}</Table.Cell>

          <Table.Cell>{`₦${item?.charge}`}</Table.Cell>

          <Table.Cell>
            <HStack>
              <IconButton
                variant="ghost"
                onClick={() => handleEdit(index, item)}
                aria-label="Edit admin charge"
              >
                <Image src="/edit-dark.svg" alt="edit" />
              </IconButton>

              <Modal
                buttonIcon={<Image src="/trash.svg" alt="delete" />}
                buttonText=""
                variant="ghost"
                px="0"
              >
                <DeleteModalContent
                  handleClick={() => handleDelete(index)}
                  text="Admin Charge"
                  isLoading={isUpdateLoading}
                  disabled={isUpdateLoading}
                />
              </Modal>
            </HStack>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default AdminChargesTable;
