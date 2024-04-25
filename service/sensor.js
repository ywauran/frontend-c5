import { realtimeDb } from "../config/firebase";
import { ref, get } from "firebase/database";

export const readItem = async () => {
  const dbRef = ref(realtimeDb, "Sensor/");
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Failed to read item:", error);
    return null;
  }
};
