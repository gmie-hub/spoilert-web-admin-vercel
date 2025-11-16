import type { FC } from "react";

import { Button, Image } from "@chakra-ui/react";

interface BackProps {
  onClick: () => void;
}

const Back: FC<BackProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      p="0"
      fontWeight="medium"
      color="blue.100"
      onClick={onClick}
      fontSize="md"
    >
      <Image src="/arrow-left.svg" alt="arrow" /> Back
    </Button>
  );
};

export default Back;
