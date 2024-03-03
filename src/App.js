import React, { useEffect, useState } from "react";
import SignIn from "./pages/signin/page";
import Home from "./pages/home/page";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./config/firebase";
import CustomizedSpinner from "./components/spinner/component";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <CustomizedSpinner />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
