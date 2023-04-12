import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  setDoc,
  getDoc,
  getDocs,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();
const userAssetsRef = collection(db, "user_assets");

// get assets for a user
getDocs(userAssetsRef).then(snapshot => {
  let assets = [];
  snapshot.docs.forEach(doc => {
    assets.push({ ...doc.data(), id: doc.id });
  });
  // console.log(assets);
});
export { app, auth, db, userAssetsRef };
