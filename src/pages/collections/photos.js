import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Photos = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            const db = getFirestore();
            const albumRef = doc(db, 'albums', id);
            const albumSnapshot = await getDoc(albumRef);
            if (albumSnapshot.exists()) {
                setAlbum({ ...albumSnapshot.data(), id: albumSnapshot.id });
            } else {
                console.log('Album not found');
            }
        };

        fetchAlbum();
    }, [id]);

    return (
        <div>
            {album && <div>{album.title}</div>}
            {/* Display photos here */}
        </div>
    );
};

export default Photos;
