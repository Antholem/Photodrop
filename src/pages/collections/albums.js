import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const Collections = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onSnapshot(collection(db, "albums"), (snapshot) => {
            const albumList = snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
            }));
            setAlbums(albumList);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
            <Box>
                <Text fontSize="2xl">Album List:</Text>
                {albums.map((album) => (
                    <Text key={album.id}>{album.title}</Text>
                ))}
            </Box>
        </Box>
    );
};

export default Collections;
