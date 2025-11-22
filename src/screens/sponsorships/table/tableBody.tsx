import { Button, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { SponsorshipsDatum } from "@spt/types/sponsorship";

const TableBody = ({ data }: { data: SponsorshipsDatum[] }) => {
  const navigate = useNavigate();

  const handleNavigate = (sponsorId: number) => {
    navigate(`${routes.main.sponsorships.details}?sponsorId=${sponsorId}`);
  };

  return (
    <>
      {data?.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Text>{item?.sponsor_name}</Text>
          </Table.Cell>

          <Table.Cell>{item?.sponsor_email}</Table.Cell>
          <Table.Cell>{`₦${item?.total_amount}`}</Table.Cell>
          <Table.Cell>{item?.total_spoils_sponsored}</Table.Cell>
          <Table.Cell>{item?.total_learners_sponsored}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              onClick={() => handleNavigate(item?.sponsor_id)}
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
