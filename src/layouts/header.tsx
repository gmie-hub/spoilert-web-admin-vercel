// import { Box, HStack, Image, Text } from "@chakra-ui/react";

// import ArrowDown from "../assets/arrow-down.svg";
// import ProfileIcon from "../assets/profile-circle.svg";

// const Header = () => {
//   //   const user = useAtomValue(userAtom);
//   //   const navigate = useNavigate();
//   // const [isLogout, setIsLogout] = useState(false);

//   //   const handleNavigateToProfile = () => {
//   //     navigate(routes.settings.settings);
//   //     window.scroll(0, 0);
//   //   };

//   // const items: MenuProps["items"] = [
//   //   {
//   //     key: 1,
//   //     label: (
//   //       <Button style={{ color: "#707070" }} type="link">
//   //         <ProfileIcon /> Profile Information
//   //       </Button>
//   //     ),
//   //   },
//   //   { type: "divider" },
//   //   {
//   //     key: 2,
//   //     label: (
//   //       <Button
//   //         type="link"
//   //         onClick={() => setIsLogout(true)}
//   //         style={{ color: "red" }}
//   //       >
//   //         <ProfileIcon /> Logout
//   //       </Button>
//   //     ),
//   //   },
//   // ];

//   return (
//     <>
//       <HStack
//         justifyContent="space-between"
//         borderBlockEnd="1px solid #efefef"
//         borderInlineStart="1px solid #efefef"
//         p="4"
//         position="sticky"
//         // px="3"
//       >
//         <Box>
//           <Text>Welcome Back, Admin</Text>
//           <Text fontSize="sm" color="gray">Here's a quick overview of Spoilert’s latest activities</Text>
//         </Box>

//         <HStack>
//           <Image src={ProfileIcon} alt="ProfileIcon" />

//           <Box>
//             <Image src={ArrowDown} alt="ArrowDown" />
//           </Box>
//         </HStack>
//       </HStack>
//     </>
//   );
// };

// export default Header;

import { useState } from "react";

import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import { useAuthStore } from "@spt/store/useAuthStore";

import ArrowDown from "../assets/arrow-down.svg";
import ProfileIcon from "../assets/profile-circle.svg";


const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(); // clear user & token
    window.location.replace("/"); // redirect to login page
  };

  const handleProfile = () => {
    navigate(routes.main.settings.home);
  };

  return (
    <HStack
      justifyContent="space-between"
      borderBlockEnd="1px solid #efefef"
      borderInlineStart="1px solid #efefef"
      p="4"
      position="sticky"
      bg="white"
      zIndex={10}
    >
      {/* Left Section */}
      <Box>
        <Text>Welcome Back, {user?.first_name || "Admin"}</Text>
        <Text fontSize="sm" color="gray">
          Here's a quick overview of Spoilert’s latest activities
        </Text>
      </Box>

      {/* Right Section - Profile + Dropdown */}
      <Box position="relative">
        <HStack
          cursor="pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Image
            src={ProfileIcon}
            alt="Profile Icon"
            boxSize="8"
            borderRadius="full"
          />
          <Image src={ArrowDown} alt="Arrow Down" boxSize="3" />
        </HStack>

        {/* Dropdown */}
        {dropdownOpen && (
          <VStack
            position="absolute"
            right={0}
            mt={2}
            bg="white"
            border="1px solid #ddd"
            borderRadius="md"
            boxShadow="md"
            p={2}
            gap={1}
            zIndex={20}
          >
            <Text
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              w="full"
              p={1}
              onClick={handleProfile}
            >
              Profile
            </Text>
            <Text
              cursor="pointer"
              _hover={{ bg: "red.50", color: "red.500" }}
              w="full"
              p={1}
              onClick={handleLogout}
            >
              Logout
            </Text>
          </VStack>
        )}
      </Box>
    </HStack>
  );
};

export default Header;
