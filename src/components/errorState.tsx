import { Text, VStack } from "@chakra-ui/react";

const ErrorState = ({ error }: { error: string | any }) => {
  return (
    <VStack w="100%">
      <Text>{error}</Text>
    </VStack>
  );
};

export default ErrorState;
