import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { StackActions, TabActions } from "@react-navigation/native";

function DeviceNotFound({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 24,
        }}
      >
        Device Not found
      </Text>
      <TouchableHighlight
        style={{
          backgroundColor: "#000",
          width: 160,
          paddingVertical: 12,
          marginVertical: 12,
        }}
        onPress={() => {
          navigation.navigate("Dashboard");
          navigation.jumpTo("Devices");
        }}
      >
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Close
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default DeviceNotFound;
