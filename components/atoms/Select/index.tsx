import React from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";


export const Select = (props) => {
    return (
           <View>
          <Text
            style={{
              position: "absolute",
              zIndex: 100,
              right: 0,
              bottom: 12,
              color: "#c7c7c7",
            }}
          >
            {props.defaultButtonText}
          </Text>
          <SelectDropdown {...props} />
        </View>
    )
  };