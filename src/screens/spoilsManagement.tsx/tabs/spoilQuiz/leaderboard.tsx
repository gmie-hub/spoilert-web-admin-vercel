import { Box } from "@chakra-ui/react";

import { Table } from "@spt/components";
import TableHeader from "@spt/partials/tableHeader";
import { leaderboardData, leaderboardHeaderData } from "@spt/utils/spoilData";

import LeaderboardTableBody from "../../table/leaderboardTable";

const duplicatedItems = Array.from({ length: 10 }, (_, index) => ({
  ...leaderboardData,
  key: index,
}));

const Leaderboard = () => {
  return (
    <Box>
      <Table
        headerChildren={<TableHeader headerItems={leaderboardHeaderData} />}
        bodyChildren={<LeaderboardTableBody items={duplicatedItems} />}
      />
    </Box>
  );
};

export default Leaderboard;
