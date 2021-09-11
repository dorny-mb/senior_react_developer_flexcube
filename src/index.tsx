import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, theme, CSSReset } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { Helmet } from "react-helmet";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { APP_NAME } from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Helmet titleTemplate={`${APP_NAME} | %s`} />
      <CSSReset />
      <Global
        styles={css`
          * {
            font-family: ${theme.fonts.body};
            box-sizing: border-box;
          }
        `}
      />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
