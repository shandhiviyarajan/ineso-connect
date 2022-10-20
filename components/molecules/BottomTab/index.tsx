import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";
import Devices from "../../screens/Devices";
import DeviceGoogleMaps from "../../screens/GoogleMap";
import QRActivate from "../../screens/QRScan";
import SettingsScreen from "../../screens/Settings";

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
          backgroundColor: "#f1f1f1",
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
              {!focused && (
                <Image
                  style={{
                    tintColor: focused ? SystemColors.primary : "#888",
                    width: 20,
                    height: 20,
                  }}
                  source={require("../../../assets/images/home-icon.png")}
                />
              )}
              {focused && (
                <Image
                  style={{
                    tintColor: SystemColors.primary,
                    width: 20,
                    height: 20,
                  }}
                  source={require("../../../assets/images/home-icon-fill.png")}
                />
              )}
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
                width: 56,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                backgroundColor: "#fff",
                height: 56,
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
                  tintColor: focused ? SystemColors.primary : "#888",
                  width: 20,
                  height: 20,
                }}
                source={require("../../../assets/images/plus-icon.png")}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={SettingsScreen}
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
              {!focused && (
                <Image
                  style={{ tintColor: SystemColors.primary }}
                  source={require("../../../assets/images/settings-icon.png")}
                />
              )}

              {focused && (
                <Image
                  style={{ tintColor: SystemColors.primary }}
                  source={require("../../../assets/images/settings-icon-fill.png")}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabController;
