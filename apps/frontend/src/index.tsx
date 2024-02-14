import React from "react";
import ReactDOM from "react-dom";

import LoginPage from "./components/LoginPage";
import "./global.styles.scss";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LoginPage />
    </ChakraProvider>
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById("__react_app__")
);
