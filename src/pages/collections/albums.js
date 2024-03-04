import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Box } from "@chakra-ui/react";
import { getFirestore, collection, onSnapshot, getDocs } from "firebase/firestore";

const Collections = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        (async () => {
            const colRef = collection(db, "albums");
            const snapshots = await getDocs(colRef);
            const docs = snapshots.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });

            setAlbums(docs);
        })()
    }, [])

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
            <Box>
                Album List:
            </Box>
            {albums.map(album => (
                <Box key={album.id}>
                    {album.title}
                </Box>
            ))}
        </Box>
    )

}

export default Collections;