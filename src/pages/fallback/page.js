import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center } from "@chakra-ui/react";

const Fallback = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <Center h="100vh">
            <Button onClick={handleClick}>
                Back
            </Button>
        </Center>
    )
}

export default Fallback;