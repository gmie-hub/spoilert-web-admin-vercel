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
  isLoading?: boolean;
  flex?: string;
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
  size = "lg",
  variant,
  isLoading,
  flex,
}) => {
  return (
    <Dialog.Root
      placement="center"
      open={open}
      motionPreset="slide-in-bottom"
      size={size}
      onOpenChange={onOpenChange}
    >
      <Dialog.Trigger flex={flex}>
        <Button
          variant={variant}
          px={px}
          py={py}
          w="full"
          onClick={onClick}
          loading={isLoading}
          disabled={isLoading}
          flex="1"
        >
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
