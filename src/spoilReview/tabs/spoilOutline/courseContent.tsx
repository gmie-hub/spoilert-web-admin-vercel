import type { FC } from "react";

import {
  Accordion,
  Box,
  Button,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Card } from "@spt/components";
import CustomAccordion from "@spt/components/accordion";
import { useVideoStore } from "@spt/store/videoStore";
import type { Module } from "@spt/types/spoils";

const MotionBox = motion(Box);

interface ComponentProps {
  modules?: Module[];
  onHide: () => void;
}

const CourseContent: FC<ComponentProps> = ({ modules, onHide }) => {
  const setVideoUrl = useVideoStore((state) => state.setVideoUrl);

  return (
    <MotionBox
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Card>
        <Stack gap="6">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              Course Content
            </Text>

            <HStack
              as="button"
              onClick={onHide}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              <Image src="/blue-menu.svg" alt="menu" />
              <Text color="blue.100" fontWeight="medium" fontSize="sm">
                Hide
              </Text>
            </HStack>
          </HStack>

          <Separator />

          {modules?.map((item, index) => (
            <Box key={index} border="1px solid #EFEFEF" borderRadius="xl">
              <CustomAccordion value={index.toString()} variant="plain">
                <>
                  <Accordion.ItemTrigger>
                    <HStack
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      px="3"
                    >
                      <Stack>
                        <Text fontSize="xs" color="gray.100">
                          Module {index + 1}
                        </Text>
                        <Text>{item?.title}</Text>
                      </Stack>

                      <Accordion.ItemIndicator />
                    </HStack>
                  </Accordion.ItemTrigger>

                  {/* <Separator /> */}

                  <Accordion.ItemContent>
                    <Stack>
                      {item?.lessons?.map((lessonItem, subIndex) => (
                        <CustomAccordion
                          value={subIndex.toString()}
                          variant="outline"
                          key={lessonItem?.id}
                        >
                          <Accordion.ItemTrigger>
                            <Button
                              variant="ghost"
                              w="full"
                              p="0"
                              onClick={() =>
                                setVideoUrl(lessonItem?.content_url)
                              }
                              _hover={{ backgroundColor: "transparent" }}
                            >
                              <HStack
                                w="100%"
                                alignItems="center"
                                justifyContent="space-between"
                                px="3"
                                cursor="pointer"
                              >
                                <HStack>
                                  <Image src="/player.svg" alt="player" />
                                  <Text fontSize="sm" color="gray.500">
                                    {lessonItem?.title}
                                  </Text>
                                </HStack>

                                <Accordion.ItemIndicator />
                              </HStack>
                            </Button>
                          </Accordion.ItemTrigger>
                        </CustomAccordion>
                      ))}
                    </Stack>
                  </Accordion.ItemContent>
                </>
              </CustomAccordion>
            </Box>
          ))}
        </Stack>
      </Card>
    </MotionBox>
  );
};

export default CourseContent;
