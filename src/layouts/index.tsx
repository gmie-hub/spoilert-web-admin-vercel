import { Box, Container, Drawer, Flex, Portal } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <main>
      <Drawer.Root>
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
                <Drawer.Body>
                  <Sidebar />
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
              <Header />
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
