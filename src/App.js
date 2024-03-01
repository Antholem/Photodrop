import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/signin/pages";

function App() {

  return (
    <ChakraProvider>
      <SignIn />
    </ChakraProvider>
  );
}

export default App;
