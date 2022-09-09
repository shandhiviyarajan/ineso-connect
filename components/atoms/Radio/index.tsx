import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";

export const RadioButton = (props) => {
  return (
    <>
      <TouchableHighlight {...props} activeOpacity={0.6} underlayColor="#fff">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: 'relative'
          }}
        >
          <View
            style={
              props.status
                ? RadioButtonStyles.active
                : RadioButtonStyles.default
            }
          >
              {
                  (props.status)  ? <View style={RadioButtonStyles.dot}/> : <></>
              }
          </View>
          <Text style={{ fontSize: 16, color: "#216FED", textAlign: "center", marginRight:8 }}>
            {props.label}
          </Text>
        </View>
      </TouchableHighlight>
    </>
  );
};

const RadioButtonStyles = StyleSheet.create({
  default: {
    borderRadius: 100,
    width: 21,
    height: 21,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#d8d8d8",
    marginRight: 8,
  },
  active: {
    borderRadius: 100,
    width: 22,
    height: 22,
    backgroundColor: "#216FED",
    borderWidth: 0,
    borderColor: "#d8d8d8",
    marginRight: 8,
  },
  dot:{
    width:16,
    height:16,
    backgroundColor:'#78a7f3',
    borderRadius:100,
    top:3,
    left:3
}
});
