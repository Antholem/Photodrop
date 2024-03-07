import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { Box, Button, Input, Text } from "@chakra-ui/react";

const Photos = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [addPhoto, setAddPhoto] = useState("");

    useEffect(() => {
        const fetchAlbum = async () => {
            const db = getFirestore();
            const albumRef = doc(db, "albums", id);
            const albumSnapshot = await getDoc(albumRef);

            if (albumSnapshot.exists()) {
                setAlbum({ ...albumSnapshot.data(), id: albumSnapshot.id });

                const photosRef = collection(albumRef, albumSnapshot.data().title);
                const unsubscribe = onSnapshot(photosRef, (snapshot) => {
                    setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                });

                return () => unsubscribe();
            } else {
                console.log("Album not found");
            }
        };

        fetchAlbum();
    }, [id]);

    const addPhotoHandler = async () => {
        const db = getFirestore();
        const albumRef = doc(db, "albums", id);
        const photosRef = collection(albumRef, album.title);

        try {
            await addDoc(photosRef, { title: addPhoto });
            setAddPhoto("");
            console.log("Photo added successfully!");
        } catch (error) {
            console.error("Error adding photo: ", error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
            <Box>
                <Text fontSize="2xl">
                    {album && album.title}
                </Text>
            </Box>
            <Box>
                {photos.map(photo => (
                    <Box key={photo.id}>{photo.title}</Box>
                ))}
            </Box>
            <Box>
                <Input
                    placeholder={`Input ${album?.title} Title`}
                    value={addPhoto}
                    onChange={(e) => setAddPhoto(e.target.value)}
                />
            </Box>
            <Box>
                <Button colorScheme="blue" variant="outline">
                    <Link to="/">
                        Back
                    </Link>
                </Button>
                <Button onClick={addPhotoHandler} colorScheme="blue">
                    Add {album?.title}
                </Button>
            </Box>
        </Box>
    );
};

export default Photos;