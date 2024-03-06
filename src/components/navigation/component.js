import React, { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from '../../config/firebase';
import { onAuthStateChanged , signOut} from 'firebase/auth';
import { Box, Button } from "@chakra-ui/react";

const Navigation = () => {
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
            <Box bg="white" w="100%" p={4} boxShadow='md' position='sticky' top={0}>
                <Button onClick={signOutHandler} colorScheme='blue' variant='solid'>
                    {user ? "Sign Out" : "Sign In"}
                </Button>
            </Box>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;