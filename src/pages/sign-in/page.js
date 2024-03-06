import { Fragment, useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { Box, Button, Text } from "@chakra-ui/react";

function SignIn() {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            window.alert('Sign In Success');
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
                    <Button onClick={signInGoogle} colorScheme='blue' variant='solid'>
                        Sign In With Google
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}

export default SignIn;
