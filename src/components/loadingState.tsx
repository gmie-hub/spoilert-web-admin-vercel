import { Container, Spinner } from "@chakra-ui/react";

const LoadingState = () => {
  return (
    <Container>
      <Spinner color="blue.100" animationDuration="0.8s" />
    </Container>
  );
};

export default LoadingState;