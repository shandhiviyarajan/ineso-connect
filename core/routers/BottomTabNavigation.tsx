import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeviceGoogleMaps from "../../components/screens/GoogleMap";
import { Devices } from "../../components/screens/Devices";
import { NavigationContainer } from "@react-navigation/native";

function BottomTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Devices" component={Devices} />
        <Tab.Screen name="Map" component={DeviceGoogleMaps} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabNavigation;
