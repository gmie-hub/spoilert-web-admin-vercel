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
  buttonText: string;
  dialogHeader: ReactNode;
}

const Modal: FC<ModalProps> = ({
  buttonIcon,
  buttonText,
  children,
  variant,
}) => {
  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" size="lg">
      <Dialog.Trigger>
        <Button variant={variant}>
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
