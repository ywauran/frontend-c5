import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex justify-around flex-1 my-4">
        <Text className="text-xl font-bold text-center text-white">
          Pemantauan Proses Tumbuh Tanaman Mentimun pada Smart Farm Berbasis IoT
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/icons/cucumber.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="py-3 bg-[#0D986A] border border-white mx-7 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-white uppercase">
              Mulai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
