// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0pWL92D70GVEodE34Wpf5TdK-quRoF6w",
  authDomain: "clone-dec-batch.firebaseapp.com",
  projectId: "clone-dec-batch",
  storageBucket: "clone-dec-batch.appspot.com",
  messagingSenderId: "40583300508",
  appId: "1:40583300508:web:2bf3f9fef6ec3a0198b459",
  measurementId: "G-PT7EC24NMS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
