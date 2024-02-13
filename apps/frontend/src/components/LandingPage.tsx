import React from "react";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";

interface LandingPageProps {
  children: React.ReactNode;
}

/* Children is a special prop that allows a component
to have nested components. */
function LandingPage() {
  return (
    <>
      {/* General container for the page */}
      <Box w={"100vw"} h={"100vh"} bg={"orange"}>
        {/* Logo */}
        <Flex border={"black solid 2px"} justifyContent={"center"}></Flex>

        {/* Buttons */}
        <Flex
          position={"absolute"}
          top={"66%"} // Places box 2/3 down page
          left={0} // Align to left
          right={0} // Align to right
          justifyContent={"space-evenly"} // Ensures buttons are evenly spaced
        >
          <Button width={"45%"} height={"3em"} paddingY={2}>
            REGISTER
          </Button>
          <Button width={"45%"} height={"3em"} paddingY={2}>
            SIGN UP
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default LandingPage;
