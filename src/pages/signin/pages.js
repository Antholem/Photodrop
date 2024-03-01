import React, { Fragment, useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Box, Button, Text, Avatar } from "@chakra-ui/react";

const SignIn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.alert("Sign In Success");
    } catch (error) {
      window.alert(error);
    }
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      window.alert("Sign Out Success");
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Fragment>
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
        <Box>
          {user ? (
            <Avatar name={user.displayName} src={user.photoURL} />
          ) : (
            <Avatar src='https://bit.ly/broken-link' />
          )}
        </Box>
        {user &&
          <Box textAlign="center">
            <Text fontSize="2xl">
              {user.displayName}
            </Text>
            <Text fontSize="lg">
              {user.email}
            </Text>
          </Box>
        }
        <Box display="flex" flexDirection="column" gap={1}>
          <Button onClick={signInGoogle} colorScheme="blue" variant="solid">
            Sign In With Google
          </Button>
          <Button onClick={signOutHandler} colorScheme="blue" variant="outline">
            Sign Out
          </Button>
        </Box>
      </Box>
    </Fragment>
  )
}

export default SignIn