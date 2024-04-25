import React from "react";
import { View, Text } from "react-native";

const CardHistoryRenewal = ({ date, amount, status }) => {
  return (
    <View className="p-4 m-2 bg-white rounded shadow-md">
      <Text className="mb-2 text-lg font-bold">{date}</Text>
      <Text className="mb-1 text-base">Amount: {amount}</Text>
      <Text className="text-base text-blue-500">Status: {status}</Text>
    </View>
  );
};

export default CardHistoryRenewal;
