import type { FC, PropsWithChildren, ReactNode } from "react";

import {
  Button,
  type ConditionalValue,
  Dialog,
  Portal,
} from "@chakra-ui/react";

interface ModalProps extends PropsWithChildren {
  buttonIcon?: ReactNode;
  buttonText?: string;
  onClick?: () => void;
  px?: string;
  py?: string;
  size?: ConditionalValue<"sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full">;
  variant: ConditionalValue<any>;
}

const Modal: FC<ModalProps> = ({
  buttonIcon,
  buttonText,
  children,
  onClick,
  px,
  py,
  size="lg",
  variant,
}) => {
  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" size={size}>
      <Dialog.Trigger>
        <Button variant={variant} px={px} py={py} onClick={onClick}>
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
