import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { Box, Button, Input } from '@chakra-ui/react';

const Photos = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [photoTitle, setPhotoTitle] = useState('');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchAlbum = async () => {
            const db = getFirestore();
            const albumRef = doc(db, 'albums', id);
            const albumSnapshot = await getDoc(albumRef);
            if (albumSnapshot.exists()) {
                setAlbum({ ...albumSnapshot.data(), id: albumSnapshot.id });

                const photosRef = collection(albumRef, albumSnapshot.data().title);
                const unsubscribe = onSnapshot(photosRef, (snapshot) => {
                    setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                });

                return () => unsubscribe();
            } else {
                console.log('Album not found');
            }
        };

        fetchAlbum();
    }, [id]);

    const addPhoto = async () => {
        const db = getFirestore();
        const albumRef = doc(db, 'albums', id);
        const photosRef = collection(albumRef, album.title);

        try {
            await addDoc(photosRef, { title: photoTitle });
            setPhotoTitle('');
            console.log("Photo added successfully!");
        } catch (error) {
            console.error("Error adding photo: ", error);
        }
    };

    return (
        <div>
            {album && <div>{album.title}</div>}
            <Box>
                <Input
                    placeholder={`Input ${album?.title} Title`}
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                />
            </Box>
            <Box>
                <Button onClick={addPhoto} colorScheme='blue'>
                    Add {album?.title}
                </Button>
            </Box>
            <Box>
                {photos.map(photo => (
                    <div key={photo.id}>{photo.title}</div>
                ))}
            </Box>
        </div>
    );
};

export default Photos;
