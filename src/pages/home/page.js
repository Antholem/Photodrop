import { Fragment, useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Box, Button, Text } from "@chakra-ui/react";

function Home() {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        <Fragment>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
                <Box>
                    <Text>
                        {user ? "Logged In" : "Not Logged In"}
                    </Text>
                </Box>
                <Box display='flex' flexDirection='column' gap={2}>
                    <Button onClick={signOutHandler} colorScheme='red' variant='outline'>
                        Sign Out
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}

export default Home;
