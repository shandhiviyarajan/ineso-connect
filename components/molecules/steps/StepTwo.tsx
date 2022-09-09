import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  ScrollView,
  Platform,
  TouchableHighlight,
} from "react-native";
import { Button } from "../../atoms/Button";
import { KeyboardAvoidingView } from "react-native";
import { Pagination } from "../Paginations";
import DatePicker from "react-native-date-picker";
import { DatePickerInput } from "../../atoms/DatePickerInput";
import { FormatDate } from "../../../core/utils/FormatValues";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { srilankan_districts } from "../../../core/data/districts";
import { SignUpPayloadAction } from "../../../core/redux/actions/authActions";
export const StepTwo = ({navigation }) => {


  //state date picker
  const [picker, setPicker] = useState(false);


 
  const payload = useSelector((state)=>state.auth.sign_up_payload);

  //form paylod
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
          source={require("../../../assets/images/step_two.png")}
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
          Sign Up to Dashboard 2
        </Text>

        <DatePicker
          title="Choose your birthdate"
          mode="date"
          modal={true}
          open={picker}
          date={new Date()}
          onConfirm={(date) => {
            setPicker(false);
            handleChange("dob", FormatDate(date, "YYYY-MM-DD"));
          }}
          onCancel={() => setPicker(false)}
        />

        <DatePickerInput
         style={{
          width:'80%',
          position: 'relative'
      }}
          label="Birthday"
          value={
            signUpPayload.dob && signUpPayload.dob
              ? FormatDate(signUpPayload.dob, "MMMM DD YYYY")
              : ""
          }
          onPress={() => setPicker(true)}
        />

        <TextInput
          onChangeText={(email) => handleChange("email", email)}
          autoCompleteType="email"
          placeholder="Enter your email address here"
          placeholderTextColor="rgba(33,111,237,.5)"
          clearButtonMode="always"
          autoCapitalize="none"
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

        <SelectDropdown
          defaultButtonText="Select your district"
          dropdownStyle={{
            borderRadius: 10,
       
          }}
          buttonStyle={{
            backgroundColor: "#fff",
            width: "80%",
            paddingVertical: 0,
            height: 44,
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(33,111,237,.5)",
            marginBottom: 44,
            paddingHorizontal: 0,
            marginVertical:12
          }}
          buttonTextStyle={{
            fontSize: 16,
            color: "#216FED",
            textAlign: "left",
            paddingHorizontal: 0,
            marginLeft: -1,
            fontWeight: "500",
          }}
          onSelect={(district, index) => {
            handleChange("district", district);
          }}
          data={srilankan_districts}
        />

   
        <Button onPress={() => navigation.navigate("Step Three")}>
          Next
        </Button>
       
      </KeyboardAvoidingView>
      <View style={{
         flex:.125
       }}>
         <Pagination index={1}  navigation={navigation}/>
       </View>
    </ScrollView>
  );
};
