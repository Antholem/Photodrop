import { Fragment } from "react";
import { Box, Text } from "@chakra-ui/react";

function Home() {

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
