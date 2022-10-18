import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ActionSetConfig } from "../../../core/redux/actions/authActions";

import { SystemColors } from "../../../core/Styles/theme/colors";

export const Welcome = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const me = useSelector((state) => state.auth.me.data);

  const appConfig = useSelector((state) => state.auth.appConfig);

  const dispatchAction = useDispatch();

  React.useEffect(() => {
    navigation.addListener("state", () => {
      AsyncStorage.getItem("@app-config").then((response) => {
        dispatchAction(ActionSetConfig(JSON.parse(response)));
      });
    });
  }, []);

  React.useEffect(() => {
    SystemColors.primary =
      appConfig && appConfig.color ? appConfig.color : "#c44518";
  }, [appConfig]);
  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: SystemColors.primary,
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
        source={
          appConfig && appConfig.background
            ? {
                uri: appConfig.background,
              }
            : require("../../../assets/images/app_bg.png")
        }
      >
        <View
          style={{
            backgroundColor: "#000",
            opacity: 0.25,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: "absolute",
          }}
        ></View>
        <View
          style={{
            flex: 0.75,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {appConfig && appConfig.logo && (
            <Image
              style={{
                width: "50%",
                height: "50%",
                maxHeight: 200,
              }}
              source={{
                uri: appConfig.logo,
              }}
            />
          )}

          {!(appConfig && appConfig.logo) && (
            <Image
              style={{
                width: "50%",
                height: "50%",
                maxHeight: 200,
              }}
              source={require("../../../assets/images/InesoMobileAppIcon.png")}
            />
          )}
          <Text
            style={{
              fontSize: 36,
              marginBottom: 12,
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Connect
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 12,
              fontWeight: "600",
              textAlign: "center",
              color: SystemColors.primary_light,
            }}
          >
            {appConfig && appConfig.name ? appConfig.name : ""}
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: SystemColors.primary_light,
            }}
          >
            The blockchain-driven IoT platform to put your business at the next
            level
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableHighlight
            onPress={() => navigateTo("Login")}
            activeOpacity={0.5}
            underlayColor="#fff"
            style={{
              width: "80%",
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                height: 48,
                borderRadius: 0,
                width: "100%",
                borderWidth: 1,
                borderColor:
                  appConfig && appConfig.color ? appConfig.color : "#fff",
                backgroundColor:
                  appConfig && appConfig.color
                    ? appConfig.color
                    : "transparent",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                CONTINUE
              </Text>
            </View>
          </TouchableHighlight>
          <Text
            style={{
              color: "#d8d8d8",
              paddingVertical: 12,
              textAlign: "center",
            }}
          >
            Version 2.0.0
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
