import React from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";

interface LandingPageProps {
  children: React.ReactNode;
}

/* Children is a special prop that allows a component
to have nested components. */
function LandingPage() {
  return (
    <>
      {/* General container for the page */}
      {/* Relative position of parent box ensures the children within it
      are position relative to the parent, not the viewport. */}
      <Box w={"100vw"} h={"100vh"} bg={"orange"} position={"relative"}>
        {/* Logo */}
        <Flex
          position={"absolute"}
          top={"33%"}
          left={0}
          right={0}
          justifyContent={"space-evenly"}
        >
          <Box border={"black solid 2px"} justifyContent={"space-evenly"}>
            <Image
              src={"https://via.placeholder.com/200"}
              alt={"placeholder"}
              boxSize={"200px"}
            />
          </Box>
        </Flex>

        {/* Buttons */}
        <Flex
          position={"absolute"}
          top={"66%"} // Places box 2/3 down page
          left={0} // Align to left
          right={0} // Align to right
          justifyContent={"space-evenly"} // Ensures buttons are evenly spaced
        >
          <Button width={"45%"} height={"4em"} paddingY={2}>
            REGISTER
          </Button>
          <Button width={"45%"} height={"4em"} paddingY={2}>
            SIGN UP
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default LandingPage;
