// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDe9f04S1jstRY-v6ZNcg3ZEFvr8vlDK5Y",
  authDomain: "smart-farm-e4704.firebaseapp.com",
  databaseURL: "https://smart-farm-e4704-default-rtdb.firebaseio.com",
  projectId: "smart-farm-e4704",
  storageBucket: "smart-farm-e4704.appspot.com",
  messagingSenderId: "458543624335",
  appId: "1:458543624335:web:d3bdca2ba6156f095c80fa",
  measurementId: "G-WNCYCTFPG1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, db, app, realtimeDb };
