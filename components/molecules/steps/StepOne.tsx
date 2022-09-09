import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  ScrollView,
  Platform,
  Dimensions
} from "react-native";
import { Button } from "../../atoms/Button";
import { LinkButton } from "../../atoms/LinkButton";
import { KeyboardAvoidingView } from "react-native";
import { Pagination } from "../Paginations";
import { RadioButton } from "../../atoms/Radio";
import { SignUpPayloadAction } from "../../../core/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
export const StepOne = ({ navigation }) => {

  const screenHeight = Dimensions.get('screen').height;

  const payload = useSelector((state)=>state.auth.sign_up_payload);

    //form payload
    const [signUpPayload, setSignUpPayload] = useState(payload);

  //create dispatcher
  const dispatch = useDispatch();

  //handle form steps
  const handleChange = (name: string, value: string) => {
    //update form states
    setSignUpPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    //dispatch payload
    dispatch(SignUpPayloadAction(signUpPayload));
  }, [signUpPayload]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
<View style={{flex:1, height:screenHeight}}>
<View style={{ flex: 1.0 }}>
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
          source={require("../../../assets/images/step_one.png")}
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
          Sign Up to Dashboard 1
        </Text>

        <TextInput
          onChangeText={(first_name) => handleChange("first_name", first_name)}
          placeholder="Enter your first name"
          placeholderTextColor="rgba(33,111,237,.5)"
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
          }}
        />

        <TextInput
          onChangeText={(last_name) => handleChange("last_name", last_name)}
          placeholder="Enter your last name"
          placeholderTextColor="rgba(33,111,237,.5)"
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
          }}
        />

        <View
          style={{
            marginVertical: 16,
            marginBottom: 36,
            flexDirection: "row",
          }}
        >
          <RadioButton
            onPress={() => handleChange("gender", "male")}
            label="Male"
            status={signUpPayload.gender === "male"}
          />
          <RadioButton
            onPress={() => handleChange("gender", "female")}
            label="Female"
            status={signUpPayload.gender === "female"}
          />
        </View>

        <Button onPress={() => navigation.navigate("Step Two", signUpPayload)}>
          Next
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent:'center',
            marginVertical: 16,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#999",
            }}
          >
            Already have an account ?
          </Text>
          <LinkButton onPress={() => navigation.navigate("Login")}>
          &nbsp; Login here
          </LinkButton>
        </View>
      
      </KeyboardAvoidingView>
      <View style={{
         flex:.125
       }}>
          <Pagination index={0}  navigation={navigation}/> 
       </View>
</View>
    </ScrollView>
  );
};
