import type { FC } from "react";

import { Box, Image, Stack, Text } from "@chakra-ui/react";

import type {
  ReportTimelineEntry,
  ReportTimelineType,
} from "@spt/types/report";
import { formatActionDate } from "@spt/utils/dateTime";

const cardBg: Record<ReportTimelineType, string> = {
  ban: "#F6F6F7",
  message: "#ECF5F7",
  note: "#FFFBEF",
};

const TimelineCard = ({ entry }: { entry: ReportTimelineEntry }) => (
  <Box position="relative">
    {/* node */}
    <Box
      position="absolute"
      left="-20px"
      top="16px"
      boxSize="12px"
      borderRadius="full"
      bg="white"
      border="2px solid"
      borderColor="gray.300"
      zIndex="1"
    />

    <Box bg={cardBg[entry.type]} borderRadius="xl" px="4" py="3">
      <Text fontWeight="semibold" fontSize="sm">
        {entry.title}
      </Text>

      {entry.description && (
        <Text fontSize="sm" color="gray" mt="1" lineHeight="1.5">
          {entry.description}
        </Text>
      )}

      <Text fontSize="xs" color="gray.100" mt="2">
        Action By:{" "}
        <Text as="span" fontWeight="semibold" color="gray.500">
          {entry.admin}
        </Text>{" "}
        | {formatActionDate(entry.date)}
      </Text>
    </Box>
  </Box>
);

interface ComponentProps {
  entries: ReportTimelineEntry[];
}

const ReportTimeline: FC<ComponentProps> = ({ entries }) => {
  return (
    <Stack gap="3">
      <Text
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        color="gray.100"
        textTransform="uppercase"
      >
        Report Timeline
      </Text>

      {entries.length === 0 ? (
        <Stack align="center" textAlign="center" gap="2" py="6">
          <Image src="/note.svg" alt="no actions" boxSize="56px" opacity="0.6" />
          <Text fontWeight="semibold">No Actions Yet</Text>
          <Text fontSize="sm" color="gray" maxW="320px">
            There are currently no recorded actions on this report. Admin
            activity will appear here once a decision is taken.
          </Text>
        </Stack>
      ) : (
        <Box position="relative" pl="7">
          {/* connector line */}
          <Box
            position="absolute"
            left="13px"
            top="22px"
            bottom="0"
            w="2px"
            bg="gray.200"
            borderRadius="full"
          />

          <Stack gap="3">
            {entries.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default ReportTimeline;
