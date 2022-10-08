import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import DeviceGoogleMaps from "../../screens/GoogleMap";

function BottomTabController() {
  const Tab = createBottomTabNavigator();
  return (
    <View
      style={{
        height: 100,
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="Map" component={DeviceGoogleMaps} />
      </Tab.Navigator>
    </View>
  );
}

export default BottomTabController;
