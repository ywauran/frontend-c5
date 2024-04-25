import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Import the Firestore db instance

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return {
    user,
  };
}
