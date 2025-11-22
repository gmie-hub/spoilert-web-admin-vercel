import { useState } from "react";

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
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { toaster } from "@spt/components/ui/toaster";
import { useGetAdminSponsorshipDetailsQuery } from "@spt/hooks/api/useGetAdminSponsorshipDetailsQuery";
import { routes } from "@spt/routes";
import { useSpoilIDStore } from "@spt/store";

const SponsorshipCodes = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const id = useSpoilIDStore((state) => state.spoilID);

  const { data, isLoading, isError, errorMessage } =
    useGetAdminSponsorshipDetailsQuery(id);

  const handleNavigation = () => navigate(routes.main.sponsorships.home);

  let codeNumber = 1;

  const copyToClipboard = async (code: string, index: number) => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error: any) {
      toaster.create({
        type: "success",
        description: error?.message || "Unable to copy code",
      });
    }
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={errorMessage} />;

  return (
    <Stack gap="4">
      <Breadcrumb previousLink="Sponsorships" currentLink="Sponsor A Spoil" />

      <Card>
        <Stack gap="5">
          <HStack justifyContent="flex-start">
            <BackButton handleNavigation={() => navigate(-1)} />
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
              {data?.data?.[0]?.codes.map((item, index) => (
                <Stack key={index}>
                  <HStack justifyContent="space-between">
                    <Text>
                      Code {codeNumber++}:{" "}
                      <Text as="span" fontWeight="medium">
                        {item?.code}
                      </Text>
                    </Text>

                    <Button
                      variant="yellowOutline"
                      onClick={() => copyToClipboard(item?.code, index)}
                    >
                      <Image src="/copy.svg" alt="copy" />
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </Button>
                  </HStack>

                  <Separator />
                </Stack>
              ))}
            </Stack>
          </Stack>

          <HStack justifyContent="end" mt="3">
            <Button borderRadius="xl" onClick={handleNavigation}>
              View All Sponsorships
            </Button>
          </HStack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SponsorshipCodes;
