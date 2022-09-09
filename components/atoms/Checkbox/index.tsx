import React from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import { IconCheck } from "../../icons/IconCheck";
export const Checkbox = (props) => {
  return (
    <TouchableHighlight {...props} activeOpacity={0.6} underlayColor="#fff">
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems:'center'
        }}
      >
        <View style={props.status ? CheckboxStyles.active : CheckboxStyles.default}><IconCheck/></View>
        <Text
          style={{
            color: "#216FED",
          }}
        >
          {props.label}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const CheckboxStyles = StyleSheet.create({
  active:{
    
      paddingVertical: 6,
      paddingHorizontal: 6,
      backgroundColor: "#216FED",
      borderRadius: 5,
      width: 20,
      height: 20,
      marginRight: 6,
    
  },
  default:{
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 20,
    height: 20,
    marginRight: 6,
    borderWidth:1,
    borderColor:'#216FED'
  }
})