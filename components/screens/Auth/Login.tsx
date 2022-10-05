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

import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../../atoms/Button";
import { HeaderStatusBar } from "../../atoms/StatusBar";

export const Login = ({ navigation }) => {
  const isLoading = useSelector((state) => state.auth.isLoading);

  const screenHeight = Dimensions.get("screen").height;
  //dispatcher
  const dispatch = useDispatch();
  //form state
  const [payload, setPayload] = useState({
    email: "ineso@gmail.com",
    password: "password",
  });

  //handle form input changes
  const handleInput = (name: string, value: string) => {
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle login
  const handleLogin = () => {
    dispatch(LoginAction(payload));
  };

  const { email, password } = payload;

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
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              backgroundColor: "#F2F5F9",
              flex: 0.75,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/InesoLogoBanner.png")}
              style={{ height: 200, width: 200 }}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            style={{
              backgroundColor: "#F2F5F9",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
            }}
          >
            <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
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
              defaultValue={email}
              onChangeText={(email) => handleInput("email", email)}
              autoCompleteType="email"
              placeholder="Email address"
              placeholderTextColor="rgba(181,78,41,.5)"
              clearButtonMode="always"
              autoCapitalize="none"
              style={{
                height: 48,
                fontSize: 18,
                color: "#000",
                textAlign: "left",
                paddingVertical: 0,
                borderWidth: 0.5,
                borderColor: "rgba(181,78,41,.5)",
                marginVertical: 12,
                paddingHorizontal: 16,
                width: "85%",
                fontWeight: "400",
                backgroundColor: "#fff",
              }}
            />
            <TextInput
              defaultValue={password}
              onChangeText={(password) => handleInput("password", password)}
              autoCompleteType="password"
              placeholder="Password"
              placeholderTextColor="rgba(181,78,41,.5)"
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
                borderColor: "rgba(181,78,41,.5)",
                marginVertical: 12,
                paddingHorizontal: 16,
                width: "85%",
                fontWeight: "400",
                backgroundColor: "#fff",
              }}
            />

            <Button onPress={() => handleLogin()} isLoading={isLoading}>
              LOG IN
            </Button>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = () => {};
