import { useState } from "react";

import { Box, Flex, HStack, Image, useBreakpointValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import CourseContent from "./courseContent";
import CourseOverview from "./courseOverview";

const MotionHStack = motion(HStack);
const MotionBox = motion(Box);

const SpoilOutline = () => {
  const [showCourseContent, setShowCourseContent] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleToggleCourseContent = () => {
    setShowCourseContent((prev) => !prev);
  };

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      w="100%"
      columnGap={{ base: 0, md: 8 }}
      rowGap={{ base: 4, md: 0 }}
      mt="2"
    >
      <AnimatePresence mode="wait">
        {showCourseContent && (
          <MotionBox
            key="course-content"
            flex={{ base: "unset", md: "1" }}
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ flex: 0, opacity: 0, x: isMobile ? 0 : -50 }}
            transition={{ duration: 0.4 }}
            overflow="hidden"
            width={{ base: "100%", md: "auto" }}
          >
            <CourseContent onHide={handleToggleCourseContent} />
          </MotionBox>
        )}
      </AnimatePresence>

      {!showCourseContent && isMobile && (
        <Box
          zIndex="10"
          as="button"
          cursor="pointer"
          onClick={handleToggleCourseContent}
          _hover={{ opacity: 0.8 }}
        >
          <Image src="/blue-menu.svg" alt="Show menu" />
        </Box>
      )}

      <MotionHStack
        flex={showCourseContent && !isMobile ? "2" : "1"}
        animate={{ flex: showCourseContent && !isMobile ? 2 : 1 }}
        transition={{ duration: 0.4 }}
        position="relative"
        gap="10"
        alignItems="flex-start"
      >
        {!showCourseContent && !isMobile && (
          <Box borderInlineEnd="1px solid #efefef" width="10%" h="full">
            <Box
              zIndex="10"
              as="button"
              cursor="pointer"
              onClick={handleToggleCourseContent}
              _hover={{ opacity: 0.8 }}
              mt="8"
            >
              <Image src="/blue-menu.svg" alt="Show menu" />
            </Box>
          </Box>
        )}

        <CourseOverview />
      </MotionHStack>
    </Flex>
  );
};

export default SpoilOutline;
