import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const NavigationBar = () => {
  return (
    <Fragment>
      <Box bg="tomato" w="100%" p={4} color="white">
        Navigation
      </Box>
      <Outlet />
    </Fragment>
  )
}

export default NavigationBar;