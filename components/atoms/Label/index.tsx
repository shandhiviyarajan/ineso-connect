import React from "react";
import { StyleSheet, Text } from "react-native";

function InputLabel(props) {
  const { children, ...rest } = props;
  return (
    <Text style={Label.text} {...rest}>
      {children}
    </Text>
  );
}

const Label = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default InputLabel;
