import type { FC } from "react";

import { Breadcrumb, HStack, Image, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BackButton from "./backButton";

interface ComponentProps {
  previousLink: string;
  currentLink: string;
  showBackButton?: boolean;
}

const CustomBreadcrumb: FC<ComponentProps> = ({
  currentLink,
  previousLink,
  showBackButton,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(-1);

  return (
    <HStack>
      {showBackButton && (
        <HStack>
          <BackButton handleNavigation={handleNavigation} />

          <Separator orientation="vertical" h="4" />
        </HStack>
      )}

      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              color="blue.100"
              fontWeight="medium"
              fontSize={{ mdDown: "xs", md: "md" }}
            >
              {previousLink}
            </Breadcrumb.Link>
          </Breadcrumb.Item>

          <Breadcrumb.Separator>
            <Image src="/separator.svg" alt="arrow" />
          </Breadcrumb.Separator>

          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink
              color="gray"
              fontSize={{ mdDown: "xs", md: "md" }}
            >
              {currentLink}
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </HStack>
  );
};

export default CustomBreadcrumb;
