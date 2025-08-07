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
  onOpenChange?: (details: any) => void;
  open?: boolean;
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
  onOpenChange,
  open,
  px,
  py,
  size="lg",
  variant,
}) => {
  return (
    <Dialog.Root placement="center" open={open} motionPreset="slide-in-bottom" size={size} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button variant={variant} px={px} py={py} w="full" onClick={onClick}>
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
