import { useState } from "react";

import { Box, Container, Drawer, Flex, HStack, IconButton, Portal, Text } from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Sidebar from "./sidebar";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <Drawer.Root
        open={menuOpen}
        onOpenChange={(e) => setMenuOpen(e.open)}
      >
        <Flex overflow="hidden" h="100vh">
          <Box
            h="100vh"
            w="17rem"
            overflow="hidden"
            display={{ base: "none", md: "block" }}
            position="fixed"
            top="0"
            left="0"
          >
            <Sidebar />
          </Box>

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <HStack
                  justify="space-between"
                  align="center"
                  px="4"
                  py="4"
                  borderBlockEnd="1px solid #efefef"
                >
                  <Text fontSize="xl" fontWeight="500">LOGO</Text>
                  <Drawer.CloseTrigger asChild>
                    <IconButton aria-label="Close menu" variant="ghost" size="sm">
                      <HiX size={22} />
                    </IconButton>
                  </Drawer.CloseTrigger>
                </HStack>
                <Drawer.Body p="0">
                  <Sidebar hideLogo onNavClick={() => setMenuOpen(false)} />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>

          <Flex
            flexDir="column"
            w="100%"
            overflow="hidden"
            ml={{ md: "17rem" }}
            flex="1"
          >
            <Box position="sticky" top="0" bg="white" zIndex="10">
              <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
            </Box>

            <Container
              flex="1"
              px={{ md: "3" }}
              py="3"
              bg="#fafafa"
              overflowY="auto"
              height="calc(100vh - 60px)"
              w="100%"
              maxW="unset"
            >
              <Box w="100%" p={{ md: "3" }} overflowX="auto">
                <Outlet />
              </Box>
            </Container>
          </Flex>
        </Flex>
      </Drawer.Root>
    </main>
  );
};

export default Layout;
