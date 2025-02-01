import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCqXPi2vx1xIVecCPIdUAGIPGRTFmBTxHU",
    authDomain: "zweckers-5d56c.firebaseapp.com",
    projectId: "zweckers-5d56c",
    storageBucket: "zweckers-5d56c.firebasestorage.app",
    messagingSenderId: "4301632590",
    appId: "1:4301632590:web:44b3c237b94d530a043f1f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);