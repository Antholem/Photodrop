import React, { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

const CustomizedSpinner = () => {
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ["blue.500", "green.500", "red.400", "yellow.300"];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [colors.length]);

    return (
        <Center h="100vh">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color={colors[colorIndex]}
                size="xl"
            />
        </Center>
    )
}

export default CustomizedSpinner;