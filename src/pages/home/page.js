import { Fragment, useEffect, useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";

function Home() {
    const [albums, setAlbums] = useState([]);
    const [addAlbum, setAddAlbum] = useState('');

    useEffect(() => {
        const db = getFirestore();
        const albumsCollection = collection(db, 'albums');

        const unsubscribe = onSnapshot(albumsCollection, (querySnapshot) => {
            const albumsList = querySnapshot.docs.map(doc => doc.data());
            setAlbums(albumsList);
        });

        return () => unsubscribe();
    }, []);

    const addAlbumHandler = async () => {
        const db = getFirestore();
        const albumCollections = collection(db, "albums");

        try {
            await addDoc(albumCollections, { title: addAlbum });
            setAddAlbum('');
            window.alert("Album added successfully!");
        } catch (error) {
            window.alert("Error adding album: ", error);
        }
    };

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
                <Box>
                    <Input
                        placeholder='Input Title'
                        value={addAlbum}
                        onChange={(e) => setAddAlbum(e.target.value)}
                    />
                </Box>
                <Box>
                    <Button onClick={addAlbumHandler} colorScheme='blue'>
                        Add
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}

export default Home;
