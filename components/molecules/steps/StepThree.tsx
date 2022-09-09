import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Button } from "../../atoms/Button";
import { FormStyle } from "../../../core/Styles/InputStyles";
import { KeyboardAvoidingView } from "react-native";
import { Pagination } from "../Paginations";
import { Checkbox } from "../../atoms/Checkbox";
import { apiSignUp } from "../../../core/API/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { SignUpPayloadAction } from "../../../core/redux/actions/authActions";
import { Message } from "../Toast";
export const StepThree = ( {route,navigation} ) => {
  const payload = useSelector((state) => state.auth.sign_up_payload);

  //form paylod
  const [signUpPayload, setSignUpPayload] = useState(payload);

  //checkbox
  const [agree, setAgree] = React.useState(false);
  //loading bar
  const [isLoading, setLoading] = useState(false);
  //handle form steps
  const handleChange = (name: string, value: string) => {
    //update form states
    setSignUpPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //create dispatcher
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch payload
    dispatch(SignUpPayloadAction(signUpPayload));
  }, [signUpPayload]);

  const handleSignUp = () => {
    console.log(navigation)
    if (
      !(
        signUpPayload.password.length > 0 &&
        signUpPayload.confirm_password.length > 0
      )
    ) {
      Message("error", "Passwords required !", "");
    } else if (!(signUpPayload.password === signUpPayload.confirm_password)) {
      Message(
        "error",
        "Passwords didn't match !",
        "Please re-enter your password and confirm password values"
      );
    } else if (agree) {
      setLoading(true);
      try {
        apiSignUp(signUpPayload)
          .then((response) => {
              setLoading(false);
              Message(
                "success",
                "User has been created !",
                "Please check your inbox to verify your email"
              );
              navigation.navigate("Email Sent", {token:response && response.data.verification_token,
              email:signUpPayload.email});
          
          })
          .catch((error) => {
            setLoading(false);

            Message(
              "error",
              "Sign up failed !",
              error.message + error.response.data.message
            );
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      Message("error", "Please agree to terms & conditions", "");
    }
  };

 
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            top: 45,
            width: "100%",
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              marginBottom: 6,
            }}
          >
            Dashboard
          </Text>
          <Text style={{ fontSize: 14, color: "#fff" }}>
            Manage your project & team in one way
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/step_three.png")}
          style={{ height: "100%", width: "100%", resizeMode: "cover" }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "#216FED",
            fontWeight: "500",
            marginVertical: 12,
          }}
        >
          Sign Up to Dashboard 3
        </Text>

        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="rgba(33,111,237,.5)"
          secureTextEntry={true}
          onChangeText={(password) => handleChange("password", password)}
          style={{
            height: 44,
            fontSize: 16,
            color: "#216FED",
            textAlign: "left",
            paddingVertical: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(33,111,237,.5)",
            marginVertical: 12,
            width: "80%",
            fontWeight: "500",
          }}
        />

        <TextInput
          onChangeText={(confirm_password) =>
            handleChange("confirm_password", confirm_password)
          }
          autoCompleteType="email"
          placeholder="Confirm your password"
          placeholderTextColor="rgba(33,111,237,.5)"
          secureTextEntry={true}
          clearButtonMode="always"
          style={{
            height: 44,
            fontSize: 16,
            color: "#216FED",
            textAlign: "left",
            paddingVertical: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(33,111,237,.5)",
            marginVertical: 12,
            width: "80%",
            fontWeight: "500",
            marginBottom: 16,
          }}
        />
        <Checkbox
          onPress={() => setAgree(!agree)}
          status={agree}
          style={{
            marginTop: 24,
            marginBottom:36
          }}
          label="I with agree terms & conditions"
        />
        <Button onPress={() => handleSignUp()} isLoading={isLoading}>
          Sign up
        </Button>
        
      </KeyboardAvoidingView>

      <View style={{
         flex:.125
       }}>
         <Pagination index={2} navigation={navigation} />
       </View>
    </ScrollView>
  );
};
