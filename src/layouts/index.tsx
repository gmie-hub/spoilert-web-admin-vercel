import { useCallback, useState } from "react";

import { Drawer } from "antd";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const onClose = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <main className={styles.container}>
      <aside className={styles.sidebarContainer}>
        <Sidebar onClose={() => {}} />
      </aside>

      <Drawer title={"LOGO"} onClose={onClose} open={open}>
        <Sidebar onClose={onClose} />
      </Drawer>

      <section className={styles.content}>
        <Header onOpen={showDrawer} />

        <section className={styles.children}>
          {/* <div>
            <RouteIndicator showBack />
          </div> */}

          <div>
            <Outlet />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Layout;
