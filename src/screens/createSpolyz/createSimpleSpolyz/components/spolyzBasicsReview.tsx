import { type FC } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { routes } from "@spt/routes";
import type { SimpleSpolyzDraft } from "@spt/store/createSpolyzStore";
import { formatCurrency } from "@spt/utils/currency";

const formatExpiryDate = (date?: string) => {
  if (!date) return "—";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}-${month}-${year}`;
};

const formatLessonType = (type?: string) => {
  if (!type) return "—";
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatPricing = (pricing?: string) => {
  if (!pricing) return "—";
  return pricing.charAt(0).toUpperCase() + pricing.slice(1);
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

interface SpolyzBasicsReviewProps {
  draft: SimpleSpolyzDraft;
}

const SpolyzBasicsReview: FC<SpolyzBasicsReviewProps> = ({ draft }) => {
  const navigate = useNavigate();

  const learningItems = draft.what_to_learn
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Stack gap="4">
      <Flex
        align="center"
        justify="space-between"
        bg="#EAF6FA"
        borderRadius="xl"
        px="5"
        py="3"
      >
        <Text fontSize="md" fontWeight="semibold" color="dark">
          Spoylz Basics
        </Text>

        <Button
          variant="yellowOutline"
          size="sm"
          py="2"
          px="4"
          onClick={() => navigate(routes.main.createSpolyz.simple)}
        >
          <HStack gap="2">
            <Image src="/edit-dark.svg" alt="" boxSize="4" />
            <Text>Edit</Text>
          </HStack>
        </Button>
      </Flex>

      <Stack gap="4">
        <Flex
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap="4"
        >
          <Box
            w="20"
            h="20"
            borderRadius="xl"
            overflow="hidden"
            flexShrink={0}
            border="1px solid #EFEFEF"
          >
            <Image
              src={draft.cover_preview}
              alt="Cover"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>

          <Button
            variant="ghost"
            color="blue.100"
            fontSize="sm"
            fontWeight="medium"
            px="0"
            h="auto"
            onClick={() => navigate(routes.main.createSpolyz.simple)}
          >
            Change Cover Image
          </Button>
        </Flex>

        <ProgressInfo>
          <InfoDisplay title="Spoylz Title" value={draft.title} />
          <InfoDisplay title="Category" value={draft.category_name} />
          <InfoDisplay title="Pricing" value={formatPricing(draft.pricing)} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            title="Institution"
            value={draft.institution || "—"}
          />
          <InfoDisplay title="Course Code" value={draft.course_code || "—"} />
          <InfoDisplay
            title="Amount"
            value={
              draft.pricing === "free"
                ? "Free"
                : formatCurrency(draft.amount).replace("₦", "N")
            }
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            title="Expiry Date"
            value={formatExpiryDate(draft.expires_at)}
          />
          <InfoDisplay
            title="Lesson Type"
            value={formatLessonType(draft.lesson_type)}
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ md: "0 0 100%" }}
            title="Description"
            value={draft.description}
          />
        </ProgressInfo>

        <Stack gap="2">
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
            What they will learn
          </Text>

          <Box ms="6">
            <List.Root>
              {learningItems.map((item, index) => (
                <List.Item key={index} _marker={{ color: "#212529" }}>
                  {item}
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </Stack>

        <Box
          border="1px solid #EFEFEF"
          borderRadius="xl"
          bg="#FBFBFB"
          px="4"
          py="3"
        >
          <HStack gap="3" align="center">
            <Flex
              align="center"
              justify="center"
              w="10"
              h="10"
              borderRadius="lg"
              bg="#EAF6FA"
              flexShrink={0}
            >
              <Image src="/player.svg" alt="" boxSize="5" />
            </Flex>

            <Stack gap="0" flex="1" minW="0">
              <Text fontSize="sm" fontWeight="medium" truncate>
                {draft.content_file.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {formatFileSize(draft.content_file.size)}
              </Text>
            </Stack>
          </HStack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SpolyzBasicsReview;
