import React from "react";
import { Login } from "../../components/screens/Auth/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppDrawer } from "../../components/molecules/AppDrawer";
import { useSelector } from "react-redux";
import { toastConfig } from "../../components/molecules/Toast";
import Toast from "react-native-toast-message";
import { ProfileStackNavigation } from "./ProfileNavigation";
import { Welcome } from "../../components/screens/Auth/Welcome";
//navigation stack
const AuthStack = createNativeStackNavigator();
const DrawerStack = createDrawerNavigator();
export const RootNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <>
          <DrawerStack.Navigator
            screenOptions={{
              swipeEdgeWidth: 0,
            }}
            drawerContent={(props) => <AppDrawer {...props} />}
          >
            <DrawerStack.Screen
              options={{ headerShown: false }}
              name="ProfileNavigation"
              component={ProfileStackNavigation}
            />
          </DrawerStack.Navigator>
        </>
      ) : (
        <>
          <AuthStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <AuthStack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                animationTypeForReplace: isAuthenticated ? "push" : "pop",
              }}
            />
            <AuthStack.Screen
              name="Login"
              component={Login}
              options={{
                animationTypeForReplace: isAuthenticated ? "push" : "pop",
              }}
            />
          </AuthStack.Navigator>
        </>
      )}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};
