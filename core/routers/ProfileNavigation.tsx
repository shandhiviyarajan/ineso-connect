import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../components/screens/Profile";
import Notifications from "../../components/screens/Notifications";
import { Device } from "../../components/screens/Devices/Device";
import ChangeState from "../../components/screens/Notifications/ChangeState";
import BottomTabController from "../../components/molecules/BottomTab";
import SettingsScreen from "../../components/screens/Settings";
import DeviceGoogleMaps from "../../components/screens/GoogleMap";
import QRSearchSuccess from "../../components/screens/QRScan/Success";
export const ProfileStackNavigation = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={BottomTabController}
      />
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen
        name="Device Maps"
        component={DeviceGoogleMaps}
        options={{
          title: "All devices",
        }}
      />
      <ProfileStack.Screen name="Change Status" component={ChangeState} />
      <ProfileStack.Screen name="All devices" component={Device} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen
        name="QRActivation"
        component={QRSearchSuccess}
        options={{
          title: "Activate  device",
        }}
      />
    </ProfileStack.Navigator>
  );
};
