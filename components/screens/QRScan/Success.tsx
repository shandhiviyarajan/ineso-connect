import React from "react";
import { Text, View } from "react-native";

function QRSearchSuccess({ navigation }) {
  return (
    <View>
      <Text>Device found Please activate the device</Text>
      <Text>{JSON.stringify(navigation)}</Text>
    </View>
  );
}

export default QRSearchSuccess;
