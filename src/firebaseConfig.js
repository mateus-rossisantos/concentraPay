// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIaQdEfQPWEkM4zmTNug5Mot_MkGV1rT4",
    authDomain: "concentrapay.firebaseapp.com",
    projectId: "concentrapay",
    storageBucket: "concentrapay.firebasestorage.app",
    messagingSenderId: "724864630167",
    appId: "1:724864630167:web:58303aaf71b84bc9e618d2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getFirestore(app);
export { auth };
