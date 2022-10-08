import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, Text, View } from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";
import Devices from "../../screens/Devices";
import DeviceGoogleMaps from "../../screens/GoogleMap";

const Tab = createBottomTabNavigator();

function BottomTabController() {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 12,
          left: 48,
          right: 48,
          backgroundColor: SystemColors.primary,
          height: 56,
          borderRadius: 12,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: SystemColors.primary,
      }}
    >
      <Tab.Screen
        name="Devices"
        component={Devices}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 64,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ tintColor: focused ? "#fff" : "#000" }}
                source={require("../../../assets/images/map-marker.png")}
              />
              <Text style={{ color: focused ? "#fff" : "#000" }}>Devices</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activate"
        component={Devices}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 64,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                backgroundColor: SystemColors.success,
                width: 84,
                height: 84,
                marginTop: -12,
                position: "absolute",
                top: -24,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 15,
                borderWidth: 4,
                borderColor: SystemColors.primary_light,
              }}
            >
              <Image
                style={{ tintColor: focused ? "#fff" : "#000" }}
                source={require("../../../assets/images/map-marker.png")}
              />
              <Text style={{ color: focused ? "#fff" : "#000" }}>Activate</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={DeviceGoogleMaps}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 64,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ tintColor: focused ? "#fff" : "#000" }}
                source={require("../../../assets/images/map-marker.png")}
              />
              <Text style={{ color: focused ? "#fff" : "#000" }}>Map</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabController;
