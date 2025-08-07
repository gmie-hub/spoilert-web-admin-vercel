import type { FC } from "react";

import { Button, Image } from "@chakra-ui/react";

interface ComponentProps {
  handleNavigation: () => void;
}

const BackButton: FC<ComponentProps> = ({ handleNavigation }) => {
  return (
    <Button
      variant="ghost"
      color="blue.100"
      onClick={handleNavigation}
      _hover={{ bg: "transparent" }}
      px="0"
    >
      <Image src="/blue-arrow-left.svg" alt="gold" /> Go Back
    </Button>
  );
};

export default BackButton;
