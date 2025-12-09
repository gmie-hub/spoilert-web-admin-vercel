import type { FC } from "react";

import { Button, Table } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
import { routes } from "@spt/routes";
import type { AdsData } from "@spt/utils/adsData";

interface TableProps {
  data: AdsData;
}

const TableBody: FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.ads.adsDetails, { id });
    navigate(path);
  };

  let serialNumber = 1;

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item.id} py="16">
          <Table.Cell>{serialNumber++}</Table.Cell>
          <Table.Cell>{item?.title}</Table.Cell>
          <Table.Cell>{item?.noOfClicks}</Table.Cell>
          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>
          <Table.Cell>{item?.startDate}</Table.Cell>
          <Table.Cell>{item?.endDate}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={() => handleRowClick(item?.id)}
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
