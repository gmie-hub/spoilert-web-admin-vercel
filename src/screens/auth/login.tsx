// import { useState } from "react";

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { object } from "yup";

import { Input } from "@spt/components";
import { useLoginMutation } from "@spt/hooks/api/useLoginMutation";
import { useAuthStore } from "@spt/store/useAuthStore";
import { validations } from "@spt/utils/validations";

const Login = () => {
  const { isLoading, loginHandler } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = object().shape({
    email: validations.email,
    password: validations.password,
  });

  return (
    <Flex minH="100vh" direction={{ base: "column", md: "row" }} bg="gray.50">
      {/* Left side */}
      <Box
        flex="1"
        bgImage="url('https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80')"
        bgSize="cover"
        bgPos="center"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={10}
        _before={{
          content: `""`,
          position: "absolute",
          inset: 0,
          bg: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <Box position="relative" zIndex={1} color="white" maxW="md">
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Get Empowered to Do More
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            With Spoilert
          </Text>
          <Text fontSize="md" color="gray.200">
            Sign in to oversee spoils, users, and platform activities. Keep
            learning organized and impactful.
          </Text>
        </Box>
      </Box>

      {/* Right side (form) */}
      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="center"
        p={{ base: 6, md: 10 }}
        bg="white"
      >
        {/* ✅ Logo at the top (above card) */}
        <Image
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Logo"
          boxSize={{ base: "60px", md: "70px" }}
          mb={6}
        />

        {/* Card */}
        <Box w={{ base: "100%" }} bg="white" p={8} rounded="xl" boxShadow="lg">
          <Stack gap={6}>
            <Box textAlign="start">
              <Heading fontSize="2xl">
                Welcome Back <span>👋</span>
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Enter your details to Log In
              </Text>
            </Box>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values) => {
                loginHandler(values);
              }}
              validationSchema={validationSchema}
            >
              {() => (
                <Form>
                  <Stack gap="6" mb="6">
                    <Box w="full">
                      <Input
                        name="email"
                        label="Email Address"
                        placeholder="example@domain.com"
                        hasAsterisk
                      />
                    </Box>
{/* 
                    <Box w="full">
                      <Input
                        name="password"
                        label="Password"
                        placeholder="Input your password"
                        hasAsterisk
                        type={showPassword ? "text" : "password"}
                      />
                      {showPassword ? "👁️" : "🙈"}
                    </Box> */}
                    <Box w="full" position="relative">
                      <Input
                        name="password"
                        label="Password"
                        placeholder="Input your password"
                        hasAsterisk
                        type={showPassword ? "text" : "password"}
                      />

                      <Box
                        position="absolute"
                        right="12px"
                        top="65%"
                        transform="translateY(-50%)"
                        cursor="pointer"
                        fontSize="20px"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "👁️" : "🙈"}
                      </Box>
                    </Box>

                    <Flex justify="flex-end">
                      <Link color="orange.500" fontSize="sm">
                        Forgot Password?
                      </Link>
                    </Flex>

                    <Button
                      type="submit"
                      colorScheme="teal"
                      size="lg"
                      w="full"
                      bg="#003B46"
                      _hover={{ bg: "#07575B" }}
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
