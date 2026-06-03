import { type FC, useEffect, useState } from "react";

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
  const setLessonContent = useVideoStore((state) => state.setLessonContent);

  // Tracks which lesson is currently shown so we can highlight it in the list.
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  // Tracks which module accordions are expanded (by index, as strings).
  const [openModules, setOpenModules] = useState<string[]>([]);

  const setModuleOpen = (value: string, open: boolean) =>
    setOpenModules((prev) =>
      open ? [...prev, value] : prev.filter((v) => v !== value)
    );

  // Default to the first lesson that actually exists (skipping modules with no
  // lessons) and the module that holds it.
  const firstModuleIndex =
    modules?.findIndex((module) => (module?.lessons?.length ?? 0) > 0) ?? -1;
  const firstLesson =
    firstModuleIndex >= 0
      ? modules?.[firstModuleIndex]?.lessons?.[0]
      : undefined;

  // Keep the viewer in sync with the currently opened spoil. Always run — even
  // when there is no lesson — so a newly opened spoil never keeps showing the
  // previous spoil's content, and the active lesson's module starts expanded.
  useEffect(() => {
    setLessonContent({
      content: firstLesson?.content ?? null,
      content_url: firstLesson?.content_url ?? null,
    });
    setActiveLessonId(firstLesson?.id ?? null);
    setOpenModules(firstModuleIndex >= 0 ? [firstModuleIndex.toString()] : []);
  }, [firstLesson, firstModuleIndex, setLessonContent]);

  const hasContent = Boolean(modules?.length);

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

          {!hasContent ? (
            <Text fontSize="sm" color="gray.500">
              No content
            </Text>
          ) : (
            modules?.map((item, index) => (
              <Box key={index} border="1px solid #EFEFEF" borderRadius="xl">
                <CustomAccordion
                  value={index.toString()}
                  variant="plain"
                  collapsible
                  open={openModules.includes(index.toString())}
                  onOpenChange={(open) =>
                    setModuleOpen(index.toString(), open)
                  }
                >
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

                    <Accordion.ItemContent>
                      <Stack>
                        {item?.lessons?.length ? (
                          item.lessons.map((lessonItem, subIndex) => {
                            const isActive =
                              lessonItem?.id === activeLessonId;

                            return (
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
                                    onClick={() => {
                                      setActiveLessonId(lessonItem?.id ?? null);
                                      setLessonContent({
                                        content: lessonItem?.content ?? null,
                                        content_url:
                                          lessonItem?.content_url ?? null,
                                      });
                                    }}
                                    _hover={{ backgroundColor: "transparent" }}
                                  >
                                    <HStack
                                      w="100%"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      px="3"
                                      py="2"
                                      cursor="pointer"
                                      borderRadius="md"
                                      bg={isActive ? "blue.100" : "transparent"}
                                      color={isActive ? "white" : "gray.500"}
                                    >
                                      <HStack>
                                        <Box
                                          filter={
                                            isActive
                                              ? "brightness(0) invert(1)"
                                              : "none"
                                          }
                                        >
                                          <Image
                                            src="/player.svg"
                                            alt="player"
                                          />
                                        </Box>
                                        <Text
                                          fontSize="sm"
                                          color={isActive ? "white" : "gray.500"}
                                          fontWeight={
                                            isActive ? "semibold" : "normal"
                                          }
                                        >
                                          {lessonItem?.title}
                                        </Text>
                                      </HStack>

                                      <Accordion.ItemIndicator />
                                    </HStack>
                                  </Button>
                                </Accordion.ItemTrigger>
                              </CustomAccordion>
                            );
                          })
                        ) : (
                          <Text fontSize="sm" color="gray.500" px="3" py="2">
                            No content
                          </Text>
                        )}
                      </Stack>
                    </Accordion.ItemContent>
                  </>
                </CustomAccordion>
              </Box>
            ))
          )}
        </Stack>
      </Card>
    </MotionBox>
  );
};

export default CourseContent;
