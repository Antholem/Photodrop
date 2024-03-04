// import React, { useEffect, useState } from "react";
// import { auth } from "../../config/firebase";
// import { Box} from "@chakra-ui/react";
// import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// const Collections = () => {
//     const [user, setUser] = useState(null);
//     const [albums, setAlbums] = useState([]);

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             setUser(user);
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const db = getFirestore();
//         const albumCollections = collection(db, "albums");

//         const unsubscribe = onSnapshot(albumCollections, (querySnapshot) => {
//             const albumsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//             setAlbums(albumsData);
//         });

//         return () => unsubscribe();
//     }, []);

//     return (
//         <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" gap={2}>
//             <Box>
//                 Album List:
//             </Box>
//             {albums.map((album) => (
//                 <Box key={album.id}>
//                     {album.title}
//                 </Box>
//             ))}
//         </Box>
//     )
// }

// export default Collections;