import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
import { routes } from "@spt/routes";
import type { Promotion } from "@spt/types/promotion";

interface TableProps {
  data: Promotion[];
}

const formatAmount = (amount: string | number) => {
  const value = Number(amount);
  if (Number.isNaN(value)) return String(amount);
  return `₦${value.toLocaleString()}`;
};

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const TableBody: FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (item: Promotion) => {
    const path = generatePath(
      routes.main.promotionsManagement.promotionsManagementDetails,
      { id: item.id }
    );
    navigate(path, { state: { promotion: item } });
  };

  let serialNumber = 1;

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item?.id} py="16">
          <Table.Cell>{serialNumber++}</Table.Cell>
          <Table.Cell>
            <HStack>
              <Image
                src={item?.spoil?.cover_image_url ?? ""}
                boxSize="10"
                borderRadius="md"
              />
              <Text color="gray">{item?.spoil?.title}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">
                {item?.spoil?.tutor
                  ? `${item.spoil.tutor.first_name} ${item.spoil.tutor.last_name}`
                  : ""}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.promotion_package_id}</Table.Cell>
          <Table.Cell>{formatAmount(item?.amount)}</Table.Cell>
          <Table.Cell>{formatDate(item?.start_date)}</Table.Cell>
          <Table.Cell>{formatDate(item?.end_date)}</Table.Cell>

          <Table.Cell>{item?.status && <Tag status={item.status} />}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={() => handleRowClick(item)}
            >
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
