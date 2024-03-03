import React from "react";
import { Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Fallback = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <Center h="100vh">
            <Button onClick={handleClick}>
                Back Home
            </Button>
        </Center>
    )
}

export default Fallback
