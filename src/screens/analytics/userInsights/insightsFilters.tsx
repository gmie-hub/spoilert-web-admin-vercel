import { Box, Flex, Input } from "@chakra-ui/react";

import { FilterSelect } from "../components/filterControls";

export type Interval = "daily" | "weekly" | "monthly";
export const intervalOptions: Interval[] = ["daily", "weekly", "monthly"];

export const ORANGE = "#D4A437";
export const TEAL = "#013B4D";

// Handles both "YYYY-MM" (monthly buckets) and "YYYY-MM-DD" (daily buckets).
export const formatLabel = (label: string) => {
  const [year, month, day] = label.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  if (Number.isNaN(date.getTime())) return label;
  return day
    ? date.toLocaleString("en-US", { month: "short", day: "numeric" })
    : `${date.toLocaleString("en-US", { month: "short" })} ${String(
        year
      ).slice(2)}`;
};

export const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload?.length) {
    return (
      <Box
        bg={ORANGE}
        color="white"
        px="3"
        py="1"
        borderRadius="md"
        fontSize="sm"
        fontWeight="bold"
        boxShadow="md"
      >
        {payload[0].value}
      </Box>
    );
  }
  return null;
};

export interface FilterControlsProps {
  from?: string;
  to?: string;
  interval?: Interval;
  onFromChange?: (value: string) => void;
  onToChange?: (value: string) => void;
  onIntervalChange?: (value: Interval) => void;
}

export const FilterControls = ({
  from = "",
  to = "",
  interval = "daily",
  onFromChange,
  onToChange,
  onIntervalChange,
}: FilterControlsProps = {}) => (
  <Flex gap={2} align="center" wrap="wrap">
    <Input
      type="date"
      size="sm"
      maxW="160px"
      value={from}
      max={to || undefined}
      onChange={(e) => onFromChange?.(e.target.value)}
    />
    <Input
      type="date"
      size="sm"
      maxW="160px"
      value={to}
      min={from || undefined}
      onChange={(e) => onToChange?.(e.target.value)}
    />
    {onIntervalChange && (
      <FilterSelect
        options={intervalOptions}
        value={interval}
        onChange={(value) => onIntervalChange(value as Interval)}
      />
    )}
  </Flex>
);
