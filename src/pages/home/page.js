import { Fragment, useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
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

    return (
        <Fragment>
            <Box display="flex" flexDirection="column" justifyContent='flex-start' alignItems='center' gap={2}>
                <Box>
                    <Text fontSize='2xl'>
                        Album List: {user && <></>}
                    </Text>
                </Box>
                <Box>
                    {/* put album.title in here */}
                </Box>
                <Box>
                    <Button colorScheme='blue' variant='solid'>
                        Create Album
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}

export default Home;
