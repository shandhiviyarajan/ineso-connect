import React from "react";
import { TouchableHighlight, View, Text, Image, TextInput } from "react-native";
export const DatePickerInput = (props) => {
  return (
    <>
      <TouchableHighlight {...props} 
      activeOpacity={0.6} underlayColor="#fff"
     >
        <View pointerEvents="none">
          <Image
            style={{
              position: "absolute",
              right: 0,
              top: 26,
              zIndex: 10,
            }}
            source={require("../../../assets/images/icon_calendar.png")}
          />
          <Text style={{position:'absolute', right:22, top:22, color:'#c7c7c7'}}>{
          props.value.length > 0 ? props.label : ''}</Text>

          <TextInput
          defaultValue={props.value+""}
            placeholder={props.label}
            placeholderTextColor="rgba(33,111,237,.5)"
            editable={true}
            style={{
              height: 44,
              fontSize: 16,
              color: "#216FED",
              textAlign: "left",
              paddingVertical: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(33,111,237,.5)",
              marginVertical: 12,
              fontWeight: "500",
            }}
          />
        </View>
      </TouchableHighlight>
    </>
  );
};
