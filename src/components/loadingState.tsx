import { Spinner, VStack } from "@chakra-ui/react";

const LoadingState = () => {
  return (
    <VStack w="100%">
      <Spinner color="blue.100" animationDuration="0.8s" />
    </VStack>
  );
};

export default LoadingState;
