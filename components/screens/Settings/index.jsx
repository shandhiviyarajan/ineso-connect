import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

function Settings() {
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            paddingVertical: "24px",
            fontSize: 24,
          }}
        >
          Settings
        </Text>
      </View>
    </>
  );
}

export default Settings;
