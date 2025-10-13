import type { FC } from "react";

import { HStack, IconButton, Image, Table } from "@chakra-ui/react";

import { useAdminChargesStore } from "@spt/store/transaction";
import type { Metadata3 } from "@spt/types/settings";
import type { TableBodyProps } from "@spt/utils/types";

const AdminChargesTable: FC<TableBodyProps> = ({ items }) => {
  const { setEditingData, deleteAdminCharge } = useAdminChargesStore();

  const handleEdit = (index: number, item: Metadata3) => {
    setEditingData(index, {
      max: item.max || undefined,
      min: item.min,
      charge: item.charge,
    });
  };

  const handleDelete = (index: number) => {
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

              <IconButton
                variant="ghost"
                onClick={() => handleDelete(index)}
                aria-label="Delete admin charge"
              >
                <Image src="/trash.svg" alt="delete" />
              </IconButton>
            </HStack>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default AdminChargesTable;
