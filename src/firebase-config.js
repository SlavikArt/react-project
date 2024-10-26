import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD38_DkWeKxyOiplPoulfNFLpss2SRh6Y8",
    authDomain: "recipes-for-all-e25ad.firebaseapp.com",
    projectId: "recipes-for-all-e25ad",
    storageBucket: "recipes-for-all-e25ad.appspot.com",
    messagingSenderId: "266833441512",
    appId: "1:266833441512:web:81e5bd79918861c58f0f5d"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
