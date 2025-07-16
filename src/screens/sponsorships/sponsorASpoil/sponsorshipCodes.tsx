import {
  Button,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { BackButton, Breadcrumb, Card } from "@spt/components";
import { routes } from "@spt/routes";

const SponsorshipCodes = () => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(routes.main.sponsorships.home);

  let codeNumber = 1;

  return (
    <Stack gap="4">
      <Breadcrumb previousLink="Sponsorships" currentLink="Sponsor A Spoil" />

      <Card>
        <Stack gap="5">
          <HStack justifyContent="flex-start">
            <BackButton handleNavigation={() => {}} />
          </HStack>

          <Stack gap="4">
            <Text fontSize="xl" fontWeight="semibold">
              Sponsorship Codes
            </Text>

            <Stack>
              <Text>Here are the sponsorship codes generated for you:</Text>

              <Text>
                <Text as="span" fontSize="lg">
                  🔹
                </Text>
                You can also find all your created and generated sponsorship
                codes in the sponsorship section under{" "}
                <Text as="span" fontWeight="medium">
                  “Created By Me”
                </Text>
              </Text>

              <Text>
                🔹Share these codes with the learners you are sponsoring. Each
                learner will enter one code at checkout to access the spoil for
                free.
              </Text>
            </Stack>

            <Stack gap="4" mt="2">
              {codes.map((item, index) => (
                <Stack key={index}>
                  <HStack justifyContent="space-between">
                    <Text>
                      Code {codeNumber++}:{" "}
                      <Text as="span" fontWeight="medium">
                        {item}
                      </Text>
                    </Text>

                    <Button variant="yellowOutline">
                      <Image src="/copy.svg" alt="copy" /> Copy
                    </Button>
                  </HStack>

                  <Separator />
                </Stack>
              ))}
            </Stack>
          </Stack>

          <HStack justifyContent="end" mt="3">
            <Button borderRadius="xl" onClick={handleNavigation}>View All Sponsorships</Button>
          </HStack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SponsorshipCodes;

const codes = ["ABC123", "XYZ789", "PRE904"];
