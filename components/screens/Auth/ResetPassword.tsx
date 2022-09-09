import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { apiResetPassword } from "../../../core/API/apiAuth";
import { Button } from "../../atoms/Button";
import { Message } from "../../molecules/Toast";

export const ResetPassword = ({ route, navigation }) => {
  //route params
  const [params, setParams] = React.useState(route.params);

  //button loading
  const [isLoading, setIsLoading] = useState(false);

  //reset password payload
  const [payload, setPayload] = useState({
    email: "",
    new_password: "Nilupulee@123",
    confirm_password: "Nilupulee@123",
    token:''
  });

  //handle input changes
  const handleChange = (name, value) => {
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //set params on load
  useEffect(() => {
    setPayload((prevState) => ({
      ...prevState,
      email: params && params.email,
    }));
  }, []);
  //handle reset passwor api call
  const handleResetPassword = () => {
    setIsLoading(true);
    if(payload.token ==='' || payload.token == null){
      Message("error", 'Please enter verification token', '');
      setIsLoading(false);
    } else if (payload.new_password !== payload.confirm_password) {
     Message("error", "Password dosen't match", "");
     setIsLoading(false);
    } else {

      apiResetPassword(payload)
        .then((response) => {
          console.log(response);
          navigation.navigate("Email Verified");
          console.log(response);
          Message("success", "Password changed successfully", "");
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          Message("error", error.response.data.message, error.message);
        });
    }
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
            height: 480,
            width: "90%",
            borderRadius: 24,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 12,
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
          <Text style={{ fontSize: 28, color: "#216FED", marginVertical: 12 }}>
            New password
          </Text>
          <Text
            style={{
              borderWidth: 2,
              backgroundColor: "rgba(33,111,237,.05)",
              borderColor: "rgba(33,111,237,.5)",
              padding: 12,
              borderRadius: 10,
              fontSize: 16,
              marginVertical: 8,
              textAlign: "center",
              color: "#209A2C",
            }}
          >
            Please create a new password that you don’t use on any other site.
          </Text>

          <TextInput
            defaultValue={payload.token}
            onChangeText={(token) => handleChange("token", token)}
            placeholder="Enter Verification token"
            placeholderTextColor="rgba(33,111,237,.5)"
            autoCapitalize="none"
            style={{
              textAlign: "left",
              height: 44,
              fontSize: 16,
              color: "#216FED",
              paddingVertical: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(33,111,237,.5)",
              marginVertical: 6,
              width: "80%",
              fontWeight: "500",
            }}
          />

          <TextInput
            onChangeText={(new_password) =>
              handleChange("new_password", new_password)
            }
            defaultValue={payload.new_password}
            placeholder="New password"
            placeholderTextColor="rgba(33,111,237,.5)"
            autoCapitalize="none"
            secureTextEntry={true}
            style={{
              textAlign: "left",
              height: 44,
              fontSize: 16,
              color: "#216FED",
              paddingVertical: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(33,111,237,.5)",
              marginVertical: 6,
              width: "80%",
              fontWeight: "500",
            }}
          />

          <TextInput
            onChangeText={(confirm_password) =>
              handleChange("confirm_password", confirm_password)
            }
            defaultValue={payload.confirm_password}
            placeholder="Confirm password"
            placeholderTextColor="rgba(33,111,237,.5)"
            secureTextEntry={true}
            style={{
              textAlign: "left",
              height: 44,
              fontSize: 16,
              color: "#216FED",
              paddingVertical: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(33,111,237,.5)",
              marginVertical: 6,
              width: "80%",
              fontWeight: "500",
            }}
          />

          <Button onPress={() => handleResetPassword()} isLoading={isLoading}>
            Reset Password
          </Button>

          <Button onPress={() => navigation.navigate("Login")}>
            Back to Sign In
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};
