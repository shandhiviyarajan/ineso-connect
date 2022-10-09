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
          bottom: 24,
          left: 24,
          right: 24,
          backgroundColor: SystemColors.primary,
          height: 64,
          borderRadius: 24,
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
                  tintColor: focused ? "#fff" : "#000",
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
                width: 84,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                backgroundColor: SystemColors.primary,
                height: 84,
                marginTop: -12,
                position: "absolute",
                top: -24,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 15,
                borderWidth: focused ? 4 : 2,
                borderColor: SystemColors.primary_light,
              }}
            >
              <Image
                style={{
                  tintColor: focused ? "#fff" : "#fff",
                  width: 32,
                  height: 32,
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
                style={{ tintColor: focused ? "#fff" : "#000" }}
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
