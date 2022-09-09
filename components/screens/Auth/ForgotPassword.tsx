import React, { useState } from "react";
import { Text } from "react-native";
import { TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../../atoms/Button";
import { apiForgotPassword } from "../../../core/API/apiAuth";
import { Message } from "../../molecules/Toast";

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState({
    email: "gangani.kalpana19@gmail.com",
  });

  const [isLoading, setIsLoading] = useState(false);

  //handle input change
  const handleChange = (name, value) => {
    setEmail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle forgot password api call
  const handleForgotPassword = () => {
    setIsLoading(true);
    apiForgotPassword(email)
      .then((response) => {
        Message("success", "Success", response.data.message, "");
        navigation.navigate("Reset Password", email);
      })
      .catch((error) => {
        console.log(error);
        Message("error", error.response.data.message, error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F2F6FC",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: "#FFFFFF",
            height: 320,
            width: "90%",
            borderRadius: 24,
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 24,
            elevation: 5,
            shadowColor: "#216FED",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 15,
          }}
        >
          <Text style={{ fontSize: 28, color: "#216FED" }}>
            Forgot Your Password ?
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 8,
            }}
          >
            Please enter the email address to sign in
          </Text>

          <TextInput
            defaultValue={email.email}
            onChangeText={(email) => handleChange("email", email)}
            placeholder="Email your email address here"
            placeholderTextColor="rgba(33,111,237,.5)"
            clearButtonMode="always"
            autoCapitalize="none"
            style={{
              textAlign: "left",
              height: 44,
              fontSize: 16,
              color: "#216FED",
              paddingVertical: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(33,111,237,.5)",
              marginVertical: 12,
              width: "80%",
              fontWeight: "500",
            }}
          />

          <Button onPress={() => handleForgotPassword()} isLoading={isLoading}>
            Submit
          </Button>

          <Button onPress={() => navigation.navigate("Login")}>
            Back to Sign In
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};
