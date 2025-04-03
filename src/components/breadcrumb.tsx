import type { FC } from "react";

import { Breadcrumb, HStack, Image, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BackButton from "./backButton";

interface ComponentProps {
  previousLink: string;
  currentLink: string;
}

const CustomBreadcrumb: FC<ComponentProps> = ({
  currentLink,
  previousLink,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(-1);

  return (
    <HStack>
      <BackButton handleNavigation={handleNavigation} />

      <Separator orientation="vertical" h="4" />

      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link color="yellow" fontSize={{ mdDown: "xs" }}>
              {previousLink}
            </Breadcrumb.Link>
          </Breadcrumb.Item>

          <Breadcrumb.Separator>
            <Image src="/separator.svg" alt="arrow" />
          </Breadcrumb.Separator>

          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink fontSize={{ mdDown: "xs" }}>
              {currentLink}
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </HStack>
  );
};

export default CustomBreadcrumb;
