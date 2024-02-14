import React from "react";
import { Box, Button, Flex, Image, VStack } from "@chakra-ui/react";

function AuthButtons() {
  /* Temporary styles for buttons; will likely be replaced with
  Chakra's 'useStyleConfig'. */
  const buttonStyles = {
    width: "50%",
    height: "4em",
  };

  /* Using VStack right now; this is similar to Flex; may decide to
  switch to Flex based on review. */
  return (
    <VStack w={"100%"} p={"10px 0"}>
      <Button width={buttonStyles.width} height={buttonStyles.height}>
        SIGN UP
      </Button>
      <Button width={buttonStyles.width} height={buttonStyles.height}>
        LOG IN
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
