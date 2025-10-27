import type { FC } from "react";

import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import type { SponsorshipDetailsDatum } from "@spt/types/sponsorship";
import {
  sponsorshipBreakdownHeaders,
} from "@spt/utils/sponsorshipData";

import SponsorshipBreakdownTableBody from "../../table/sponsorshipBreakdownTableBody";

interface SponsorshipBreakdownProps {
  handleNavigate: () => void;
  data: SponsorshipDetailsDatum[];
}

const SponsorshipBreakdown: FC<SponsorshipBreakdownProps> = ({
  data,
  handleNavigate,
}) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = data?.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Spoil Management
          </Text>

          <Table
            headerChildren={
              <TableHeader headerItems={sponsorshipBreakdownHeaders} />
            }
            bodyChildren={
              <SponsorshipBreakdownTableBody
                items={visibleItems}
                handleNavigation={handleNavigate}
              />
            }
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={data}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SponsorshipBreakdown;
