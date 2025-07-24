import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDHojBNnSsMzxF8DUIFHa9hPUD4YN7rfPo",
    authDomain: "laonwise-a38b0.firebaseapp.com",
    projectId: "laonwise-a38b0",
    storageBucket: "laonwise-a38b0.firebasestorage.app",
    messagingSenderId: "274897769373",
    appId: "1:274897769373:web:b46a042bcc64ac7dd1d574"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
