import type { FC, PropsWithChildren, ReactNode } from "react";

import {
  Button,
  type ConditionalValue,
  Dialog,
  Portal,
} from "@chakra-ui/react";

interface ModalProps extends PropsWithChildren {
  variant: ConditionalValue<any>;
  buttonIcon: ReactNode;
  buttonText?: string;
  px?: string;
  py?: string;
}

const Modal: FC<ModalProps> = ({
  buttonIcon,
  buttonText,
  children,
  px,
  py,
  variant,
}) => {
  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" size="lg">
      <Dialog.Trigger>
        <Button variant={variant} px={px} py={py}>
          {buttonIcon} {buttonText}
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>{children}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
