import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Me } from "../../components/screens/Dashboard";
export const ProfileNavigation = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Me}
      />
    </ProfileStack.Navigator>
  );
};
