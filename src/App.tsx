import * as React from "react";

import Home from "./components/home";

import { Provider } from "react-redux";

import { Container } from "@mui/material";
import store from "./store";

export function App() {
  return (
    <Provider store={store}>
      <Container>
        <Home />
      </Container>
    </Provider>
  );
}
