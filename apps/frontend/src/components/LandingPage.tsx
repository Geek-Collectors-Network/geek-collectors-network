import React from "react";
import { Box, Button, Flex, Image, VStack } from "@chakra-ui/react";

function AuthButtons() {
  const buttonStyles = {
    width: "50%",
    height: "4em",
  };
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

/* Children is a special prop that allows a component
to have nested components. */
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
