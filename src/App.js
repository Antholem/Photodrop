import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import SignIn from "./pages/sign-in/page";
import CustomizedSpinner from "./components/spinner/component";
import Navigation from "./components/navigation/component";
import Fallback from "./pages/fallback/page";
import Albums from "./pages/databases/albums/pages";
import Photos from "./pages/databases/photos/page";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        <Route element={<Navigation />}>
          <Route path="/" element={user ? <Albums /> : <Navigate to="/signin" replace />} />
          <Route path="albums/:id" element={user ? <Photos /> : <Navigate to="/signin" replace />} />
          {user && <Route path="*" element={<Fallback />} />}
        </Route>
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" replace />} />
        {!user && <Route path="*" element={<Fallback />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;