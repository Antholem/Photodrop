import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import SignIn from "../pages/signin/page";
import Home from "../pages/home/page";
import CustomizedSpinner from "../components/spinner/component";
import NavigationBar from "../components/navigation-bar/component";

function StructuredRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <CustomizedSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationBar />}>
          <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
        </Route>
        <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StructuredRoute;
