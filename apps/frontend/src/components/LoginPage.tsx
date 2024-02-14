import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronLeftIcon } from "@chakra-ui/icons";

function LoginPage() {
  return (
    <>
      <Box w={"100vw"} h={"100vh"} bg={"white"}>
        <Box as="header" bg="orange" p={6} zIndex="sticky" top={0}>
          <Flex justify="end" align="center">
            <HamburgerIcon as="button" w={8} h={8} color="white" />
          </Flex>
        </Box>
        <VStack bg={"background.900"} px={10} pt={20}>
          <Flex w={"100%"} align={"center"} justify={"start"} mb={10}>
            <ChevronLeftIcon as="button" w={8} h={8} color="brand.500" />
            <Heading size={"sm"} m={"auto"}>
              Login
            </Heading>
          </Flex>
          <Stack spacing={8} w={{ base: "100%", md: "80%", lg: "50%" }}>
            <FormControl id="email">
              <Input type="email" placeholder="Email" />
            </FormControl>
            <FormControl id="password">
              <Input type="password" placeholder="Password" />
            </FormControl>
            <Button bg={"orange"} variant="solid" mt={8} p={6}>
              LOGIN
            </Button>
          </Stack>
        </VStack>
      </Box>
    </>
  );
}

export default LoginPage;
