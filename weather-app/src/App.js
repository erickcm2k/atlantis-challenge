import { Container } from "@chakra-ui/layout";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <Container>
      <Navbar />
      <Home />
    </Container>
  );
};

export default App;
