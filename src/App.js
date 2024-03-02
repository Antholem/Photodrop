import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/signin/page";
import Home from "./pages/home/page";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />}/>
          <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
