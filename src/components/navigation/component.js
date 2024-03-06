import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Navigation = () => {

    return (
        <Fragment>
            <Box bg="white" w="100%" p={4} boxShadow='md' position='sticky' top={0}>
                Navigation
            </Box>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;