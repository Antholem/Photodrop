import React from 'react';
import { Box, Button, ChakraProvider, Text } from '@chakra-ui/react';
import { auth, googleProvider } from './config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.alert('Sign In Success');
    } catch (error) {
      window.alert(error);
    }
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      window.alert('Sign Out Success');
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <ChakraProvider>
      <Box height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={3}>
        <Text fontSize='2xl'>
          Photodrop Login
        </Text>
        <Box>
          <Button onClick={signInGoogle} colorScheme='blue' variant='solid'>
            Sign In With Google
          </Button>
        </Box>
        <Box>
          <Button onClick={signOutHandler} colorScheme='blue' variant='outline'>
            Sign Out
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
