
import React, { useEffect, useState } from "react";
import { auth } from "../../../config/firebase";
import { Box, Button, Input } from "@chakra-ui/react";
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Albums = () => {
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [albumsTitle, setAlbumsTitle] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const db = getFirestore();
        const albumCollections = collection(db, "albums");

        const unsubscribe = onSnapshot(albumCollections, (querySnapshot) => {
            const albumsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAlbums(albumsData);
        });

        return () => unsubscribe();
    }, []);

    const addAlbum = async () => {
        const db = getFirestore();
        const albumCollections = collection(db, "albums");

        try {
            await addDoc(albumCollections, { title: albumsTitle });
            setAlbumsTitle('');
            console.log("Album added successfully!");
        } catch (error) {
            console.error("Error adding album: ", error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
            <Box>
                Album List: {user && <>log</>}
            </Box>
            {albums.map((album) => (
                <Box key={album.id}>
                    <Link to={`/albums/${album.id}`}>
                        {album.title}
                    </Link>
                </Box>
            ))}

            <Box>
                <Input
                    placeholder='Input Title'
                    value={albumsTitle}
                    onChange={(e) => setAlbumsTitle(e.target.value)}
                />
            </Box>
            <Box>
                <Button onClick={addAlbum} colorScheme='blue'>
                    Add
                </Button>
            </Box>
        </Box>
    )
}

export default Albums;