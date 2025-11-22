import type { FC, ReactNode } from "react";

import { HStack } from "@chakra-ui/react";

interface ComponentProps {
  status: string;
  icon?: ReactNode;
}

const CustomTag: FC<ComponentProps> = ({ icon, status }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
      case "successful":
      case "active":
      case "redeemed":
      case "issued":
        return "#F0FFF4";
      case "inactive":
        return "#FFF5F6";
      case "unpublished":
        return "#FFF5F6";
      case "failed":
        return "#FFF5F6";
      case "expired":
        return "#FFF5F6";
      case "ongoing":
        return "#FFF9E9";
      case "pending":
        return "#FFF9E9";
      default:
        return "#F4F4F4";
    }
  };

  const getTextColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
      case "successful":
      case "active":
      case "redeemed":
      case "issued":
        return "#28A745";
      case "inactive":
        return "red";
      case "unpublished":
        return "red";
      case "failed":
        return "red";
      case "unused":
        return "red";
      case "expired":
        return "red";
      case "ongoing":
        return "#FFC107";
      case "pending":
        return "#FFC107";
      default:
        return "#495057";
    }
  };

  return (
    <HStack
      alignItems="center"
      bg={getStatusColor(status)}
      px="2"
      py="1"
      borderRadius="xl"
      borderColor="transparent"
      border="none"
      w="fit-content"
      color={getTextColor(status)}
      fontSize={{ mdDown: "sm" }}
    >
      {icon && icon}
      {status}
    </HStack>
  );
};

export default CustomTag;
