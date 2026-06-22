import type { FC } from "react";

import { Box, HStack, Image, Link, Stack, Tag, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";

import { RichText } from "@spt/components";
import { useVideoStore } from "@spt/store/videoStore";
import type { SpoilData } from "@spt/types/spoils";

interface ComponentProps {
  data?: SpoilData;
}


const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov|avi|mkv|m3u8)(\?.*)?$/i;
const AUDIO_EXTENSIONS = /\.(mp3|wav|aac|flac|m4a|ogg)(\?.*)?$/i;
const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp)(\?.*)?$/i;
const PDF_EXTENSIONS = /\.pdf(\?.*)?$/i;
const OFFICE_EXTENSIONS = /\.(docx?|xlsx?|pptx?)(\?.*)?$/i;
const TEXT_EXTENSIONS = /\.(txt|md|csv)(\?.*)?$/i;

// Renders any embeddable URL (PDF / Office / text / etc.) in a framed viewer.
const FrameViewer = ({ src, title }: { src: string; title: string }) => (
  <Box borderRadius="lg" overflow="hidden" width="100%">
    <iframe
      src={src}
      width="100%"
      height="600px"
      style={{ border: "none", borderRadius: "inherit" }}
      title={title}
    />
  </Box>
);

const CourseOverview: FC<ComponentProps> = ({ data }) => {
  const lessonContent = useVideoStore((state) => state.lessonContent);

  const url = lessonContent?.content_url ?? null;
  const text = lessonContent?.content ?? null;

  const renderContent = () => {
    if (url) {
      if (VIDEO_EXTENSIONS.test(url)) {
        return (
          <Box
            position="relative"
            pt="56.25%"
            borderRadius="lg"
            overflow="hidden"
            width="100%"
          >
            <ReactPlayer
              src={url}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls
            />
          </Box>
        );
      }

      if (AUDIO_EXTENSIONS.test(url)) {
        return (
          <Box borderRadius="lg" overflow="hidden" width="100%">
            <audio controls style={{ width: "100%" }}>
              <source src={url} />
              Your browser does not support the audio element.
            </audio>
          </Box>
        );
      }

      if (IMAGE_EXTENSIONS.test(url)) {
        return (
          <Box borderRadius="lg" overflow="hidden" width="100%">
            <Image src={url} alt="lesson content" width="100%" />
          </Box>
        );
      }

      if (PDF_EXTENSIONS.test(url)) {
        return <FrameViewer src={url} title="PDF content" />;
      }

      // Office documents (Word/Excel/PowerPoint) can't be embedded directly,
      // so render them through Microsoft's official Office viewer.
      if (OFFICE_EXTENSIONS.test(url)) {
        return (
          <FrameViewer
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              url
            )}`}
            title="Document content"
          />
        );
      }

      // Plain text / markdown renders fine straight in an iframe.
      if (TEXT_EXTENSIONS.test(url)) {
        return <FrameViewer src={url} title="Text content" />;
      }

      // Any other type: best-effort preview via Google's universal viewer,
      // with a download link as a fallback when it can't be rendered inline.
      return (
        <Stack gap="2" w="100%">
          <FrameViewer
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              url
            )}&embedded=true`}
            title="File content"
          />
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
            textDecoration="underline"
            fontSize="sm"
          >
            Open {url.split("/").pop()}
          </Link>
        </Stack>
      );
    }

    if (text) {
      // Text lessons store rich HTML (e.g. "<b>bold lesson</b>"), so render it
      // as sanitised markup rather than escaping it into a plain string.
      return (
        <RichText
          html={text}
          p="4"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          bg="white"
          color="gray.700"
        />
      );
    }

    return (
      <Box
        p="6"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        bg="gray.50"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.500">
          No content
        </Text>
      </Box>
    );
  };

  return (
    <Stack gap="4" w="100%">
      {renderContent()}

      <Stack gap="3" mt="2">
        <Text fontSize="lg" fontWeight="semibold">
          {data?.title}
        </Text>
        <Text fontWeight="medium">Overview</Text>
      </Stack>

      <Stack gap="1">
        <Box>
          <Tag.Root
            variant="outline"
            colorPalette="gray"
            py="2"
            borderRadius="lg"
          >
            <Tag.Label color="gray.600">{data?.category?.name}</Tag.Label>
          </Tag.Root>
        </Box>

        <HStack gap="1">
          <Image src="/user-icon.svg" alt="user" />
          <Text color="gray.500" as="u">
            {`${data?.tutor?.first_name} ${data?.tutor?.last_name}`}
          </Text>
        </HStack>
      </Stack>

      <Text color="gray">{data?.description}</Text>

      <Stack>
        <Text fontWeight="medium">What you will learn</Text>

        <Stack gap="4">
          {data?.what_to_learn?.split(",")?.map((item, index) => (
            <HStack
              key={index}
              alignItems={{ base: "flex-start", md: "center" }}
            >
              <Image src="/tri-bullet.svg" alt="bullet" />
              <Text color="gray">{item}</Text>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseOverview;