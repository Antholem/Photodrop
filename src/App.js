import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Home from "./pages/home/page";
import SignIn from "./pages/sign-in/page";
import CustomizedSpinner from "./components/spinner/component";
import Navigation from "./components/navigation/component";
import Fallback from "./pages/fallback/page";

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
          <Route path="/" element={user ? <Home /> : <Navigate to="/signin" replace />} />
          {user && <Route path="*" element={<Fallback />} />}
        </Route>
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" replace />} />
        {!user && <Route path="*" element={<Fallback />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;