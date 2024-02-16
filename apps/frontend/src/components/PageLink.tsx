import React from "react";
import { HStack,  Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface PageLinkProps {
    text: string;
    to: string;
    padding?: number;
  }

function PageLink({ text, to, padding } : PageLinkProps) {
    return (
      <HStack w={"100%"} justify={"center"} p={padding} color={"#007bff"}>
        <ChakraLink as={ReactRouterLink} to={to}>
          <b>{text}</b>
        </ChakraLink>
      </HStack>
    );
  }

export default PageLink;
