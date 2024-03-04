import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import SignIn from "../pages/signin/page";
import Home from "../pages/home/page";
import CustomizedSpinner from "../components/spinner/component";
import NavigationBar from "../components/navigation-bar/component";
import Fallback from "../pages/fallback/page";
import Collections from "../pages/collections/albums";
import Photos from "../pages/collections/photos";

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
          <Route index element={user ? <Home /> : <Navigate to="/signin" />} />
          <Route path="collections" element={<Collections />} />
          {/* <Route path="albums/:id" element={user ? <Photos /> : <Navigate to="/signin" />} /> */}
          {user && <Route path="*" element={<Fallback />} />}
        </Route>
        <Route path="signin" element={<SignIn />} />
        {!user && <Route path="*" element={<Fallback />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default StructuredRoute;
