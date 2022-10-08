import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SystemColors } from "../../../core/Styles/theme/colors";
import Devices from "../../screens/Devices";
import DeviceGoogleMaps from "../../screens/GoogleMap";

const Tab = createBottomTabNavigator();

function BottomTabController() {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: SystemColors.primary,
      }}
    >
      <Tab.Screen name="Devices" component={Devices} />
      <Tab.Screen name="Activate" component={Devices} />
      <Tab.Screen name="Map" component={DeviceGoogleMaps} />
    </Tab.Navigator>
  );
}

export default BottomTabController;
