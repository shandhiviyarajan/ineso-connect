import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SystemColors } from "../../../core/Styles/theme/colors";
function SelectBox(props) {
  return (
    <>
      <SelectDropdown
        {...props}
        defaultButtonText={props.value ? props.value : props.placeholder}
        dropdownStyle={{
          borderRadius: 4,
          marginTop: Platform.OS === "ios" ? 0 : -24,
          boxShadow: 0,
        }}
        renderCustomizedRowChild={(item) => (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            {item}
          </Text>
        )}
        buttonStyle={{
          backgroundColor: "#fff",
          width: "100%",
          paddingVertical: 0,
          height: 44,
          borderWidth: 1,
          borderColor: props.disabled
            ? "#d9d9d9"
            : props.value
            ? "#d9d9d9"
            : "#d9d9d9",
          marginVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 4,
        }}
        renderDropdownIcon={() => (
          <View>
            <Image
              source={require("../../../assets/images/down-arrow-svgrepo-com.png")}
              style={{ height: 11, width: 20, tintColor: SystemColors.primary }}
            />
          </View>
        )}
        buttonTextStyle={{
          fontSize: 14,
          color: props.disabled ? "#888" : SystemColors.primary,
          textAlign: "left",
          paddingHorizontal: 0,
          marginLeft: -1,
          fontWeight: "600",
        }}
      />
    </>
  );
}

const style = StyleSheet.create({
  buttonStyle: {},
});

export default SelectBox;
