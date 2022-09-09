import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";

export const LinkButton = (props) => {
  return (
    <>
      <TouchableHighlight
        style={{
          minHeight: 36,
        }}
        {...props}
        activeOpacity={0.5}
        underlayColor="none"
      >
        <Text style={[{ color: SystemColors.primary }, props.style]}>
          {props.children}
        </Text>
      </TouchableHighlight>
    </>
  );
};
