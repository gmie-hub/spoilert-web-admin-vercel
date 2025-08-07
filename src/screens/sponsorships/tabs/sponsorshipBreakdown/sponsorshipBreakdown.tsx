import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  sponsorshipBreakdownData,
  sponsorshipBreakdownHeaders,
} from "@spt/utils/sponsorshipData";

import SponsorshipBreakdownTableBody from "../../table/sponsorshipBreakdownTableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...sponsorshipBreakdownData,
  key: index,
}));

const SponsorshipBreakdown = ({
  handleNavigate,
}: {
  handleNavigate: () => void;
}) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

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
            items={duplicatedItems}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SponsorshipBreakdown;