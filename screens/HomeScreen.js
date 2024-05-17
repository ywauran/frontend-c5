import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { ref, onValue, off } from "firebase/database";
import { realtimeDb } from "../config/firebase";
import axios from "axios";

export default function HomeScreen() {
  const [isPump, setIsPump] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(false);
  const [predictStatus, setPredictStatus] = useState(null);

  const getTemperatureStatus = (temp) => {
    if (temp < 21) {
      return "Dingin";
    } else if (temp > 27) {
      return "Panas";
    } else {
      return "Normal";
    }
  };

  const getHumidityStatus = (humidity) => {
    if (humidity < 80) {
      return "Kurang Lembab";
    } else if (humidity <= 85) {
      return "Cukup";
    } else {
      return "Sangat Lembab";
    }
  };

  const getSoilMoistureStatus = (moisture) => {
    if (moisture < 60) {
      return "Kurang Lembab";
    } else if (moisture <= 80) {
      return "Kelembaban Normal";
    } else {
      return "Sangat Lembab";
    }
  };

  const predict = async () => {
    if (!data) return;
    console.log("Predicting with data:", data.soilmoist, data.tempt, data.humi);
    try {
      const response = await axios.post("http://192.168.1.14:5000/predict", {
        soilMoisture: data.soilmoist,
        temperature: data.tempt,
        humidity: data.humi,
      });
      console.log("Predicted status:", response.data);
      setPredictStatus(response.data.prediction[0]);
    } catch (error) {
      console.log("Failed to predict:", error);
    }
  };

  useEffect(() => {
    const sensorRef = ref(realtimeDb, "Sensor/");
    const unsubscribe = onValue(
      sensorRef,
      (snapshot) => {
        if (snapshot.exists()) {
          console.log("Updated sensor data:", snapshot.val());
          setData(snapshot.val());
        } else {
          console.log("No data available");
          setData(null);
        }
      },
      (error) => {
        console.error("Failed to read realtime data:", error);
      }
    );

    return () => off(sensorRef, "value", unsubscribe);
  }, []);

  useEffect(() => {
    if (data) {
      predict();
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.row}>
              <View style={styles.item}>
                <Text style={styles.label}>Temperature</Text>
                <Progress.Circle
                  size={180}
                  progress={data ? data.tempt / 100 : 0}
                  color="green"
                />
                <Text style={styles.value}>
                  {getTemperatureStatus(data?.tempt)}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>Soil Moisture</Text>
                <Progress.Circle
                  size={180}
                  progress={data ? data.soilmoist / 100 : 0}
                  color="green"
                />
                <Text style={styles.value}>
                  {getSoilMoistureStatus(data?.soilmoist)}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.item}>
                <Text style={styles.label}>Humidity</Text>
                <Progress.Circle
                  size={180}
                  progress={data ? data.humi / 100 : 0}
                  color="green"
                />
                <Text style={styles.value}>
                  {getHumidityStatus(data?.humi)}
                </Text>
              </View>
            </View>
            {!status && (
              <View style={styles.pumpContainer}>
                <Text style={styles.pumpLabel}>Pump</Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    isPump ? styles.buttonActive : styles.buttonInactive,
                  ]}
                  onPress={() => setIsPump(!isPump)}
                  disabled
                >
                  <Text
                    style={
                      isPump
                        ? styles.buttonActiveText
                        : styles.buttonInactiveText
                    }
                  >
                    {predictStatus ?? "Loading..."}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  innerContainer: {
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  item: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  pumpContainer: {
    alignItems: "center",
  },
  pumpLabel: {
    marginBottom: 4,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 160,
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "green",
  },
  buttonInactive: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
  },
  buttonActiveText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonInactiveText: {
    color: "green",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
