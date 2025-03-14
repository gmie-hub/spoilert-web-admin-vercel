import { Box, HStack, Image, Text } from "@chakra-ui/react";

import ArrowDown from "../assets/arrow-down.svg";
import ProfileIcon from "../assets/profile-circle.svg";

const Header = () => {
  //   const user = useAtomValue(userAtom);
  //   const navigate = useNavigate();
  // const [isLogout, setIsLogout] = useState(false);

  //   const handleNavigateToProfile = () => {
  //     navigate(routes.settings.settings);
  //     window.scroll(0, 0);
  //   };

  // const items: MenuProps["items"] = [
  //   {
  //     key: 1,
  //     label: (
  //       <Button style={{ color: "#707070" }} type="link">
  //         <ProfileIcon /> Profile Information
  //       </Button>
  //     ),
  //   },
  //   { type: "divider" },
  //   {
  //     key: 2,
  //     label: (
  //       <Button
  //         type="link"
  //         onClick={() => setIsLogout(true)}
  //         style={{ color: "red" }}
  //       >
  //         <ProfileIcon /> Logout
  //       </Button>
  //     ),
  //   },
  // ];

  return (
    <>
      <HStack
        justifyContent="space-between"
        borderBlockEnd="1px solid #efefef"
        borderInlineStart="1px solid #efefef"
        p="4"
        pos="-webkit-sticky"
        // px="3"
      >
        <Box>
          <Text>Welcome Back, Admin</Text>
          <Text fontSize="sm" color="gray">Here's a quick overview of Spoilert’s latest activities</Text>
        </Box>

        <HStack>
          <Image src={ProfileIcon} alt="ProfileIcon" />

          <Box>
            <Image src={ArrowDown} alt="ArrowDown" />
          </Box>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
