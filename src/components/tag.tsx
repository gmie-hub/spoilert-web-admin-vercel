import { Box } from "@chakra-ui/react";

const CustomTag = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#F0FFF4";
      case "Active":
        return "#F0FFF4";
      case "inactive":
        return "red";
      case "Ongoing":
        return "#FFF9E9";
      default:
        return "#F4F4F4";
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#28A745";
      case "Active":
        return "#28A745";
      case "inactive":
        return "red";
      case "Ongoing":
        return "#FFC107";
      default:
        return "#495057";
    }
  };

  return (
    <Box
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
      {status}
    </Box>
  );
};

export default CustomTag;
