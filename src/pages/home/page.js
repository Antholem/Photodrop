import { Fragment, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

function Home() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const albumsCollection = collection(db, 'albums');

        const unsubscribe = onSnapshot(albumsCollection, (querySnapshot) => {
            const albumsList = querySnapshot.docs.map(doc => doc.data());
            setAlbums(albumsList);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Fragment>
            <Box display="flex" flexDirection="column" justifyContent='flex-start' alignItems='center' gap={2}>
                <Box>
                    <Text fontSize='2xl'>
                        Album List:
                    </Text>
                </Box>
                {albums.map(album => (
                    <Box key={album.id}>
                        <Text>{album.title}</Text>
                    </Box>
                ))}
            </Box>
        </Fragment>
    );
}

export default Home;
