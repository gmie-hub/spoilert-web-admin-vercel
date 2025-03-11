import { type FC, useState } from "react";

import { Button, Dropdown, type MenuProps } from "antd";

import ArrowDown from "../assets/arrow-down.svg";
import ProfileIcon from "../assets/profile-circle.svg";

import styles from "./styles.module.scss";

// import { logout } from '../utils/logout';
// import { userAtom } from '../utils/store';

// import { isCurrentDateGreaterThan } from '../utils/dateFormat';

interface ComponentProp {
  onOpen: () => void;
}

const Header: FC<ComponentProp> = ({ onOpen }) => {
  //   const user = useAtomValue(userAtom);
  //   const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);

  //   const handleNavigateToProfile = () => {
  //     navigate(routes.settings.settings);
  //     window.scroll(0, 0);
  //   };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Button style={{ color: "#707070" }} type="link">
          <ProfileIcon /> Profile Information
        </Button>
      ),
    },
    { type: "divider" },
    {
      key: 2,
      label: (
        <Button
          type="link"
          onClick={() => setIsLogout(true)}
          style={{ color: "red" }}
        >
          <ProfileIcon /> Logout
        </Button>
      ),
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <div>
          {/* <ProfileIcon className={styles.blinker} /> */}
          <div>
            <p className={styles.name}>Welcome Back, Admin</p>
            <p>Here's a quick overview of Spoilert’s latest activities</p>
          </div>
        </div>
        <div>
          <img src={ProfileIcon} alt="ProfileIcon" />

          <Dropdown menu={{ items }}>
            <button
              // onClick={(e) => {
              //   e.preventDefault();
              //   // Navigate programmatically if needed
              // }}
              className={styles.info}
            >
              <img src={ArrowDown} alt="ArrowDown" />
            </button>
          </Dropdown>

          {/* <MenuIcon className={styles.menu} onClick={onOpen} /> */}
          <img
            src={ArrowDown}
            alt="ArrowDown"
            className={styles.menu}
            onClick={onOpen}
          />
        </div>
      </header>

      {/* <ModalContent
        open={isLogout}
        handleCancel={() => {
          setIsLogout(false);
        }}
        icon={false}
        handleClick={() => {
          setIsLogout(false);
        }}
        // title={'ssjsj'}
        text={'Sure to Logout? 🤔'}
      /> */}
    </>
  );
};

export default Header;
