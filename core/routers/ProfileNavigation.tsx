import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../components/screens/Profile";
import Notifications from "../../components/screens/Notifications";
import { Devices } from "../../components/screens/Devices";
import { Device } from "../../components/screens/Devices/Device";
import DeviceGoogleMaps from "../../components/screens/GoogleMap";
import ChangeState from "../../components/screens/Notifications/ChangeState";
import QRScan from "../../components/screens/QRScan";
import QRSearch from "../../components/screens/QRScan/QRSearch";
import BottomTabController from "../../components/molecules/BottomTab";
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
      <ProfileStack.Screen name="Change Status" component={ChangeState} />
      <ProfileStack.Screen name="Device" component={Device} />
    </ProfileStack.Navigator>
  );
};
