import React from "react";
import { Box, Button, ButtonGroup, Flex, Image, VStack } from "@chakra-ui/react";

function AuthButtons() {
  /* Temporary styles for buttons; will likely be replaced with
  Chakra's 'useStyleConfig'. */
  const buttonStyles = {
    height: "4em",
    width: {"base": "50%", "md": "50%"},
    fontSize: {"base" : "lg", "md": "xl"}
  };

  /* VStack isthe same as Flex but with 'flex-direction' set to 'column'.
  If we want horiztonal placement on larger screens, we can switch back to Flex. */
  return (
    <VStack w={"100%"} p={4}>
      <Button
        h={buttonStyles.height}
        width={buttonStyles.width}
        fontSize={buttonStyles.fontSize}>
          SIGN UP
      </Button>
      <Button
        h={buttonStyles.height}
        width={buttonStyles.width}
        fontSize={buttonStyles.fontSize}>
          LOGIN
      </Button>
    </VStack>
  );
}

function LandingPage() {
  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      bg={"orange"}
      align={"center"}
      justify={"center"}
      direction={"column"}
    >
      {/* Logo */}
      <Box border={"black 2px solid"}>
        <Image
          src={"https://via.placeholder.com/200"}
          alt={"Company Logog Placeholder"}
          boxSize={"250px"}
        />
      </Box>
      <AuthButtons />
    </Flex>
  );
}

export default LandingPage;
