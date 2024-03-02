import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      window.alert('Sign Out Success');
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Box display="flex" flexDirection='column' justifyContent='center' alignItems='center' h='100vh' gap={2}>
      <Box>
        <Text fontSize='2xl'>
          Home
        </Text>
        {user ? "Logged In" : "You need to log"}
      </Box>
      <Box>
        <Button onClick={signOutHandler} colorScheme='red' variant='outline'>
          Sign Out
        </Button>
      </Box>
    </Box>
  )
}

export default Home;
