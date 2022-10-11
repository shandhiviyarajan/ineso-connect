import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";
import Devices from "../../screens/Devices";
import DeviceGoogleMaps from "../../screens/GoogleMap";
import QRActivate from "../../screens/QRScan";

const Tab = createBottomTabNavigator();

function BottomTabController() {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#eee",
          height: 56,
          borderRadius: 0,
          borderWidth: 0,
          borderTopWidth: 1,
          borderTopColor: "#d8d8d8",
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
                width: 56,
                height: 56,

                justifyContent: "center",
                alignItems: "center",
                marginBottom: Platform.OS === "ios" ? -28 : 0,
              }}
            >
              <Image
                style={{
                  tintColor: focused ? SystemColors.primary : "#666",
                  width: 20,
                  height: 16,
                }}
                source={require("../../../assets/images/list-icon.png")}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activate"
        component={QRActivate}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 64,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                backgroundColor: "#fff",
                height: 64,
                marginTop: -12,
                position: "absolute",
                top: -6,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,

                borderColor: "#666",
              }}
            >
              <Image
                style={{
                  tintColor: focused ? SystemColors.primary : "#666",
                  width: 24,
                  height: 24,
                }}
                source={require("../../../assets/images/plus-icon.png")}
              />
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
                width: 56,
                height: 56,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: Platform.OS === "ios" ? -28 : 0,
              }}
            >
              <Image
                style={{ tintColor: focused ? SystemColors.primary : "#666" }}
                source={require("../../../assets/images/map-marker.png")}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabController;
