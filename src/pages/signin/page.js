import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { Box, Button, Text } from '@chakra-ui/react';

const SignIn = () => {
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.alert('Sign In Success');
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Box display="flex" flexDirection='column' justifyContent='center' alignItems='center' h='100vh' gap={2}>
      <Box>
        <Text fontSize='2xl'>
          Log in
        </Text>
      </Box>
      <Box>
        <Button onClick={signInGoogle} colorScheme='blue' variant='solid'>
          Sign In
        </Button>
      </Box>
    </Box>
  )
}

export default SignIn