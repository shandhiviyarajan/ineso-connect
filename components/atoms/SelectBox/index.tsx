import React from "react";
import { Image, Platform, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SystemColors } from "../../../core/Styles/theme/colors";
function SelectBox(props) {
  return (
    <>
      <SelectDropdown
        {...props}
        defaultButtonText={props.placeholder}
        dropdownStyle={{
          borderRadius: 4,
          marginTop: Platform.OS === "ios" ? 0 : -24,
          boxShadow: 0,
        }}
        renderCustomizedRowChild={(item) => (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {item}
          </Text>
        )}
        buttonStyle={{
          backgroundColor: SystemColors.primary_light,
          width: "100%",
          paddingVertical: 0,
          height: 44,
          borderWidth: 2,
          borderColor: props.disabled ? "#999" : SystemColors.primary,
          marginVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 4,
        }}
        renderDropdownIcon={() => (
          <View>
            <Image
              source={require("../../../assets/images/down-arrow-svgrepo-com.png")}
              style={{ height: 9, width: 20, tintColor: SystemColors.primary }}
            />
          </View>
        )}
        buttonTextStyle={{
          fontSize: 16,
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

export default SelectBox;
