import {
  Accordion,
  Box,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Card } from "@spt/components";
import CustomAccordion from "@spt/components/accordion";

const MotionBox = motion(Box);

const CourseContent = ({ onHide }: { onHide: () => void }) => {
  const coursesArray = Array.from({ length: 5 }, (_, i) => i);

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

          {coursesArray?.map((_, index) => (
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
                        <Text>Introduction To Design Principles</Text>
                      </Stack>

                      <Accordion.ItemIndicator />
                    </HStack>
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Stack>
                      {coursesArray?.map((_, subIndex) => (
                        <>
                          <CustomAccordion
                            value={subIndex.toString()}
                            variant="outline"
                          >
                            <Accordion.ItemTrigger>
                              <HStack
                                w="100%"
                                alignItems="center"
                                justifyContent="space-between"
                                px="3"
                              >
                                <HStack>
                                  <Image src="/player.svg" alt="player" />
                                  <Text fontSize="sm" color="gray.500">
                                    What are Design Principles
                                  </Text>
                                </HStack>

                                <Accordion.ItemIndicator />
                              </HStack>
                            </Accordion.ItemTrigger>
                          </CustomAccordion>
                        </>
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