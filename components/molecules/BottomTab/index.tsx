import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { Devices } from "../../screens/Devices";
import AboutTab from "../../screens/TabScreens/about";
import HomeTab from "../../screens/TabScreens/home";

function BottomTabController() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home Tab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home Tab" component={HomeTab} />
      <Tab.Screen name="About" component={AboutTab} />
    </Tab.Navigator>
  );
}

export default BottomTabController;
