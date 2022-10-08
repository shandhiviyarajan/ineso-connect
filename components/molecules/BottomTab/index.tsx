import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { Devices } from "../../screens/Devices";
import AboutTab from "../../screens/TabScreens/about";
import HomeTab from "../../screens/TabScreens/home";

function BottomTabController() {
  const Tab = createBottomTabNavigator();
  return (
    <View
      style={{
        height: 100,
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="Devices" component={Devices} />
        <Tab.Screen name="About" component={AboutTab} />
      </Tab.Navigator>
    </View>
  );
}

export default BottomTabController;
