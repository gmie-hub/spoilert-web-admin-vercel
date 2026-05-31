import { Flex, Text } from "@chakra-ui/react";
import { HiChevronDown, HiOutlineCalendar } from "react-icons/hi";

export function FilterSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Flex
      as="label"
      align="center"
      gap="1"
      border="1px solid #e2e8f0"
      borderRadius="md"
      px="3"
      py="1.5"
      bg="white"
      cursor="pointer"
      fontSize="sm"
      color="gray.700"
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none",
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "inherit",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <HiChevronDown size={14} />
    </Flex>
  );
}

export function DatePickerButton({
  label,
  value,
  onChange,
  max,
  min,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  max?: string;
  min?: string;
}) {
  return (
    <Flex
      as="label"
      align="center"
      gap="2"
      border="1px solid #e2e8f0"
      borderRadius="md"
      px="3"
      py="1.5"
      bg="white"
      cursor="pointer"
      position="relative"
      overflow="hidden"
    >
      <Text fontSize="sm" color={value ? "gray.700" : "gray.500"} userSelect="none">
        {value || label}
      </Text>
      <HiOutlineCalendar size={15} color="#9ca3af" />
      <input
        type="date"
        value={value ?? ""}
        max={max}
        min={min}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          cursor: "pointer",
          width: "100%",
        }}
      />
    </Flex>
  );
}
