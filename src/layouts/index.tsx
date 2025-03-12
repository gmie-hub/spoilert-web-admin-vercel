import { Box, Container, Drawer, Flex, Grid, Portal } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";

const Layout = () => {
  return (
    <main>
      <Drawer.Root>
        <Grid templateColumns={{ base: "1fr", md: "16rem 1fr" }}>
          <Box
            h="100vh"
            overflow="hidden"
            display={{ base: "none", md: "block" }}
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
            overflowY="hidden"
            className={styles.content}
          >
            <Header />

            <Container
              flexGrow="1"
              padding="3"
              bg="#fafafa"
              overflowX="hidden"
              overflowY="auto"
              className={styles.children}
            >
              <Box w="100%">
                <Outlet />
              </Box>
            </Container>
          </Flex>
        </Grid>
      </Drawer.Root>
    </main>
  );
};

export default Layout;
