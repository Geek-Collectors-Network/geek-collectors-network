import React from "react";
import ReactDOM from "react-dom";

import "./global.styles.scss";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import LandingPage from "./components/LandingPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPage></LandingPage>
    </ChakraProvider>
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById("__react_app__")
);
