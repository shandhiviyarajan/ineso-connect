import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../../core/redux/actions/authActions";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import validator from "validator";

import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../../atoms/Button";
import { HeaderStatusBar } from "../../atoms/StatusBar";
import { Message } from "../../molecules/Toast";
import { SystemColors } from "../../../core/Styles/theme/colors";

export const Login = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);

  const screenHeight = Dimensions.get("screen").height;

  const appConfig = useSelector((state) => state.auth.appConfig);
  //dispatcher
  const dispatch = useDispatch();
  //form state
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const me = useSelector((state) => state.auth.me.data);
  //handle form input changes
  const handleInput = (name: string, value: string) => {
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function validateForm() {
    const validations = {
      email: "",
      password: "",
    };

    if (payload.email.length === 0) {
      validations.email = "Email address required";
    } else if (!validator.isEmail(payload.email)) {
      validations.email = "Invalid email address";
    } else if (payload.password.length === 0) {
      validations.password = "Password required";
    }

    if (validations.email || validations.password) {
      Message("error", "Login failed ", Object.values(validations).join(""));
    }
    return Object.values(validations).every((v) => v === "");
  }
  //handle login
  const handleLogin = () => {
    if (validateForm()) {
      dispatch(LoginAction(payload));
    }
  };
  return (
    <>
      <HeaderStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ScrollView>
        <View
          style={{
            height: screenHeight,
            flexDirection: "column",
            flexGrow: 1,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {appConfig &&
              appConfig.logo &&
              appConfig.isSVG &&
              appConfig.name.includes("Nippon") && (
                <Image
                  source={require("../../../logos//nippongases-logo.png")}
                />
              )}
            {appConfig && appConfig.logo && appConfig.isPNG && (
              <Image
                source={{ uri: appConfig.logo }}
                style={{
                  width: "50%",
                  height: "50%",
                  maxHeight: 200,
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
                source={require("../../../assets/images/InesoLogoBanner.png")}
              />
            )}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundColor: "#fff",
            }}
          >
            <View style={{ paddingHorizontal: 24 }}>
              <Text
                style={{
                  fontSize: 32,
                  color: "#000",
                  fontWeight: "600",
                  textAlign: "left",
                  marginBottom: 12,
                }}
              >
                Welcome
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000",
                  fontWeight: "400",
                  textAlign: "left",
                  marginBottom: 12,
                }}
              >
                Log in to continue with Connect and access IOT services and
                more...
              </Text>
            </View>

            <TextInput
              onChangeText={(email) => handleInput("email", email)}
              autoCompleteType="email"
              placeholder="Email address"
              placeholderTextColor="rgba(0,0,0,.25)"
              clearButtonMode="always"
              autoCapitalize="none"
              style={{
                height: 48,
                fontSize: 18,
                color: "#000",
                textAlign: "left",
                paddingVertical: 0,
                borderWidth: 0.5,
                borderColor: SystemColors.primary,
                marginVertical: 12,
                paddingHorizontal: 16,
                width: "90%",
                fontWeight: "400",
                backgroundColor: "#fff",
              }}
            />
            <TextInput
              onChangeText={(password) => handleInput("password", password)}
              autoCompleteType="password"
              placeholder="Password"
              placeholderTextColor="rgba(0,0,0,.25)"
              secureTextEntry={true}
              clearButtonMode="always"
              autoCapitalize="none"
              style={{
                height: 48,
                fontSize: 18,
                color: "#000",
                textAlign: "left",
                paddingVertical: 0,
                borderWidth: 0.5,
                borderColor: SystemColors.primary,
                marginVertical: 12,
                paddingHorizontal: 16,
                width: "90%",
                fontWeight: "400",
                backgroundColor: "#fff",
              }}
            />

            <View
              style={{
                height: 48,
                width: "100%",
                marginVertical: 24,
              }}
            >
              <Button onPress={() => handleLogin()} isLoading={isLoading}>
                LOG IN
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};
