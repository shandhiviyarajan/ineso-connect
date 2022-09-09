import React from "react";
import { View, Platform, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { useSelector } from "react-redux";

export const AppCustomHeader = (props) => {
  const navigation = useNavigation();
  const handleDrawer = () => {
    navigation.openDrawer();
  };

  const handleProfileNav = () => {
    props.navigation.navigate("Profile");
  };

  const handleAlertNav = () => {
    props.navigation.navigate("Notifications");
  };

  const alerts = useSelector((state) => state.alert.alerts.data);

  return (
    <>
      <View
        style={{
          width: "100%",
          position: "relative",
          zIndex: 1000,
          height: Platform.OS === "android" ? 56 : 90,
          backgroundColor: SystemColors.primary,
          paddingTop: Platform.OS === "android" ? 6 : 40,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-between",
          elevation: 25,
          shadowColor: "rgba(94, 132, 194, 1)",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => handleDrawer()}
          style={{
            backgroundColor: SystemColors.primary,
            width: 44,
            height: 44,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 26,
              height: 26,
            }}
            source={require("../../../assets/images/drawer_menu_icon.png")}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            marginHorizontal: 12,
            height: 44,
          }}
        ></View>
        <View
          style={{
            marginRight: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {alerts && (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                position: "absolute",
                backgroundColor: "red",
                zIndex: 100,
                top: -0,
                right: -5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff",
                  fontWeight: "600",
                  textAlign: "center",
                  paddingTop: 3,
                }}
              >
                {alerts && alerts.length}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => handleAlertNav()}
            style={{
              position: "relative",
              overflow: "visible",
              width: 24,
              height: 24,
            }}
          >
            <Image
              source={require("../../../assets/images/alert-svgrepo-com.png")}
              style={{
                width: 20,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handleProfileNav()}>
            <Image
              source={require("../../../assets/images/profile_icon.png")}
              style={{
                width: 32,
                height: 32,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
