import type { FC, ReactNode } from "react";

import { HStack } from "@chakra-ui/react";

interface ComponentProps {
  status: string;
  icon?: ReactNode;
}

const CustomTag: FC<ComponentProps> = ({ icon, status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#F0FFF4";
      case "Successful":
        return "#F0FFF4";
      case "Active":
        return "#F0FFF4";
      case "Used":
        return "#F0FFF4";
      case "Inactive":
        return "#FFF5F6";
      case "Unpublished":
        return "#FFF5F6";
      case "Failed":
        return "#FFF5F6";
      case "Expired":
        return "#FFF5F6";
      case "Ongoing":
        return "#FFF9E9";
      case "Pending":
        return "#FFF9E9";
      default:
        return "#F4F4F4";
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#28A745";
      case "Successful":
        return "#28A745";
      case "Active":
        return "#28A745";
      case "Used":
        return "#28A745";
      case "Inactive":
        return "red";
      case "Unpublished":
        return "red";
      case "Failed":
        return "red";
      case "Unused":
        return "red";
      case "Expired":
        return "red";
      case "Ongoing":
        return "#FFC107";
      case "Pending":
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
