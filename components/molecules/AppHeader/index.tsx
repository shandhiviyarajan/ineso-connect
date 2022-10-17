import React from "react";
import { View, Platform, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { MeAction } from "../../../core/redux/actions/authActions";

export const AppCustomHeader = (props) => {
  const navigation = useNavigation();
  const me = useSelector((state) => state.auth.me.data);
  const alerts = useSelector((state) => state.alert.alerts.data);
  const devices = useSelector((state) => state.device.devices);
  const handleDrawer = () => {
    navigation.openDrawer();
  };

  const handleProfileNav = () => {
    props.navigation.navigate("Profile");
  };

  const handleAlertNav = () => {
    props.navigation.navigate("Notifications");
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(MeAction());
  }, []);

  return (
    <>
      <View
        style={{
          width: "100%",
          position: "relative",
          zIndex: 1000,
          height: Platform.OS === "android" ? 56 : 90,
          paddingTop: Platform.OS === "android" ? 6 : 40,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-between",
          elevation: 0,
        }}
      >
        {/* <TouchableOpacity
          onPress={() => handleDrawer()}
          style={{
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              tintColor: SystemColors.primary,
            }}
            source={require("../../../assets/images/drawer_menu_icon.png")}
          />
        </TouchableOpacity> */}
        <View>
          <Text
            style={{
              fontSize: 22,
              marginVertical: 4,
              fontWeight: "500",
            }}
          >
            My Devices
          </Text>
          <Text>
            {devices && devices.data && devices.data.length
              ? devices && devices.data && devices.data.length + " Devices"
              : ""}
          </Text>
        </View>

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
                top: 4,
                right: -0,
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
              width: 44,
              height: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/alert-svgrepo-com.png")}
              style={{
                tintColor: SystemColors.primary,
                width: 18,
                height: 20,
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
                tintColor: SystemColors.primary,
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
