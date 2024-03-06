import { Fragment, useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Box, Text } from "@chakra-ui/react";

function Home() {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Fragment>
            <Box display="flex" flexDirection="column" justifyContent='flex-start' alignItems='center' gap={2}>
                <Box>
                    <Text fontSize='2xl'>
                        Home
                    </Text>
                </Box>
            </Box>
        </Fragment>
    );
}

export default Home;
