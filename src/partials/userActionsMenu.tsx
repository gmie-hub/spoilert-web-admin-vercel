import { type FC, useState } from "react";

import {
  Box,
  type ButtonProps,
  IconButton,
  Image,
  Menu,
  Portal,
  Separator,
} from "@chakra-ui/react";

import { ConfirmDialog } from "@spt/components";
import { useToggleUserStatusMutation } from "@spt/hooks/api/useToggleUserStatusMutation";
import { useVerifyUserMutation } from "@spt/hooks/api/useVerifyUserMutation";
import type { UserDatum } from "@spt/types/user";
import { nowForApi } from "@spt/utils/dateTime";

type PendingAction = "email" | "phone" | "status";

interface DialogCopy {
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant: ButtonProps["variant"];
  image: string;
}

interface ComponentProps {
  user: UserDatum;
}

/**
 * Row actions for a learner or tutor: manually mark their email/phone verified,
 * and enable or disable the account. Every action is confirmed first — none of
 * them have an undo beyond running the opposite action, and verification has no
 * opposite at all.
 */
const UserActionsMenu: FC<ComponentProps> = ({ user }) => {
  const [pending, setPending] = useState<PendingAction | null>(null);

  const { verifyUser, isVerifying } = useVerifyUserMutation(user?.id);
  const { toggleUserStatus, isTogglingStatus } = useToggleUserStatusMutation(
    user?.id
  );

  const isEmailVerified = !!user?.email_verified_at;
  const isPhoneVerified = !!user?.phone_verified_at;
  // The API sends is_active as 1/0, but takes a real boolean on the way back.
  const isActive = !!user?.is_active;

  const fullName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "This user";

  const dialogCopy: Record<PendingAction, DialogCopy> = {
    email: {
      title: "Verify this email address?",
      description: `${user?.email || fullName} will be marked as verified. This cannot be undone from the dashboard.`,
      confirmLabel: "Yes, Verify",
      confirmVariant: "yellow",
      image: "/question-chat.svg",
    },
    phone: {
      title: "Verify this phone number?",
      description: `${user?.phone_number || `${fullName}'s phone number`} will be marked as verified. This cannot be undone from the dashboard.`,
      confirmLabel: "Yes, Verify",
      confirmVariant: "yellow",
      image: "/question-chat.svg",
    },
    status: isActive
      ? {
          title: "Deactivate this user?",
          description: `${fullName} will lose access to their account until you activate them again.`,
          confirmLabel: "Yes, Deactivate",
          confirmVariant: "danger",
          image: "/danger.svg",
        }
      : {
          title: "Activate this user?",
          description: `${fullName} will regain access to their account.`,
          confirmLabel: "Yes, Activate",
          confirmVariant: "yellow",
          image: "/question-chat.svg",
        },
  };

  const handleConfirm = async () => {
    if (!pending) return;

    if (pending === "status") {
      await toggleUserStatus({ is_active: !isActive });
    } else {
      // Only the field being verified is sent, so the other one keeps whatever
      // the API already holds.
      await verifyUser(
        pending === "email"
          ? { email_verified_at: nowForApi() }
          : { phone_verified_at: nowForApi() }
      );
    }

    setPending(null);
  };

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            aria-label="User actions"
            variant="ghost"
            size="sm"
            _hover={{ backgroundColor: "transparent" }}
            _focus={{ backgroundColor: "transparent" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src="/more.svg" alt="more" />
          </IconButton>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content
              display="flex"
              flexDir="column"
              w="220px"
              gap="2"
              px="3"
            >
              {!isEmailVerified && (
                <Menu.Item
                  value="verify-email"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPending("email");
                  }}
                >
                  <Image src="/verify.svg" alt="verify" />
                  <Box flex="1">Verify Email Address</Box>
                </Menu.Item>
              )}

              {!isPhoneVerified && (
                <Menu.Item
                  value="verify-phone"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPending("phone");
                  }}
                >
                  <Image src="/verify.svg" alt="verify" />
                  <Box flex="1">Verify Phone Number</Box>
                </Menu.Item>
              )}

              {/* Only a divider when there is something above it to divide. */}
              {(!isEmailVerified || !isPhoneVerified) && <Separator />}

              <Menu.Item
                value="toggle-status"
                onClick={(e) => {
                  e.stopPropagation();
                  setPending("status");
                }}
              >
                <Image
                  src={isActive ? "/close-circle.svg" : "/checked.svg"}
                  alt="status"
                />
                <Box flex="1" color={isActive ? "red" : undefined}>
                  {isActive ? "Deactivate User" : "Activate User"}
                </Box>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(open) => !open && setPending(null)}
        title={pending ? dialogCopy[pending].title : ""}
        description={pending ? dialogCopy[pending].description : ""}
        confirmLabel={pending ? dialogCopy[pending].confirmLabel : ""}
        confirmVariant={pending ? dialogCopy[pending].confirmVariant : "yellow"}
        image={pending ? dialogCopy[pending].image : "/question-chat.svg"}
        loading={isVerifying || isTogglingStatus}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default UserActionsMenu;
