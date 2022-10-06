import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../components/screens/Profile";
import Notifications from "../../components/screens/Notifications";
import { Devices } from "../../components/screens/Devices";
import { Device } from "../../components/screens/Devices/Device";
import DeviceGoogleMaps from "../../components/screens/GoogleMap";
import ChangeState from "../../components/screens/Notifications/ChangeState";
import QRScan from "../../components/screens/QRScan";
export const ProfileNavigation = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator initialRouteName="Dashboard">
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={Devices}
      />
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen name="Change Status" component={ChangeState} />
      <ProfileStack.Screen
        name="Devices"
        component={Devices}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen name="Device" component={Device} />
      <ProfileStack.Screen name="QR" component={QRScan} />
      <ProfileStack.Screen
        name="DeviceGoogleMaps"
        component={DeviceGoogleMaps}
      />
    </ProfileStack.Navigator>
  );
};
