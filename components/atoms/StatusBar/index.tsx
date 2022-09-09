import React from "react";
import { StatusBar, View } from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";
export const HeaderStatusBar = (props) => {
  return (
    <>
      <View
        style={{
          backgroundColor: SystemColors.primary,
        }}
      >
        <StatusBar
          {...props}
          animated={true}
          translucent={true}
          backgroundColor={SystemColors.primary}
        />
      </View>
    </>
  );
};
