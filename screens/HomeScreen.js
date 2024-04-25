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

  const predict = async () => {
    console.log(data.soilmoist);
    console.log(data.tempt);
    console.log(data.humi);
    try {
      const response = await axios.post("http://192.168.1.117:5000/predict", {
        soilMoisture: data.tempt,
        temperature: data.soilmoist,
        humidity: 21,
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
          // data: {"humi": 2147483647, "soilmoist": 0, "tempt": 27}
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
    console.log("hello");
    predict();
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView className="p-8">
          <View className="p-8">
            <View
              className="space-x-4"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <View>
                <Text className="mb-4 font-bold text-center">Temperature</Text>
                <Progress.Circle size={180} progress={100} color="green" />
                <Text className="mt-4 text-2xl font-bold text-center">
                  {data?.tempt}
                </Text>
              </View>
              <View>
                <Text className="mb-4 font-bold text-center">
                  Soil Moisture
                </Text>
                <Progress.Circle size={180} progress={100} color="green" />
                <Text className="mt-4 text-2xl font-bold text-center">
                  {data?.soilmoist}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View>
                <Text className="mb-4 font-bold text-center">Humidty</Text>
                <Progress.Circle size={180} progress={100} color="green" />
                <Text className="mt-4 text-2xl font-bold text-center">21</Text>
              </View>
            </View>
          </View>
          <View />
          {status ? null : (
            <View>
              <Text className="mb-1 text-2xl font-bold text-center ">Pump</Text>
              <TouchableOpacity
                className={`w-40 ${
                  isPump
                    ? " bg-green-800"
                    : "bg-white  border-2 border-green-800 text-green-800"
                } px-6 py-3 mx-auto rounded-full`}
                onPress={() => setIsPump(!isPump)}
                disabled
              >
                <Text
                  className={`${
                    isPump ? "text-white" : "text-green-800 "
                  } font-semibold text-center uppercase`}
                >
                  {predictStatus}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
