import React, { Fragment, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { Box, Button, Text } from "@chakra-ui/react";

const SignIn = () => {
  const [isBtnLoading, setIsBtnloading] = useState(false);    

  const signInGoogle = async () => {
    setIsBtnloading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      window.alert("Sign In Success");
      setIsBtnloading(false);
    } catch (error) {
      window.alert(error);
      setIsBtnloading(false);
    }
  };

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
        <Box>
          <Text fontSize="2xl">
            Log in
          </Text>
        </Box>
        <Box>
          <Button isLoading={isBtnLoading} onClick={signInGoogle} colorScheme="blue" variant="solid">
            Sign In
          </Button>
        </Box>
      </Box>
    </Fragment>
  )
}

export default SignIn