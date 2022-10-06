import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { SystemColors } from "../../../core/Styles/theme/colors";
export const Button = (props) => {
  const { underlayColor } = props;
  return (
    <TouchableHighlight
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 48,
      }}
      {...props}
      activeOpacity={0.5}
      underlayColor={underlayColor ? underlayColor : "#fff"}
    >
      <View
        style={[
          props.isLoading
            ? ButtonStyle.Loading
            : props.secondary
            ? ButtonStyle.Secondary
            : props.Rounded
            ? ButtonStyle.RoundedSmall
            : props.Success
            ? ButtonStyle.Success
            : ButtonStyle.Primary,
        ]}
      >
        {props.isLoading ? (
          <ActivityIndicator color={SystemColors.primary} />
        ) : (
          <>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              {props.buttonIcon}
              <Text
                style={
                  props.secondary ? ButtonStyle.SecondaryText : ButtonStyle.Text
                }
              >
                {props.children}
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableHighlight>
  );
};

const ButtonStyle = StyleSheet.create({
  RoundedSmall: {
    textAlign: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: SystemColors.primary,
    borderRadius: 0,
    width: "90%",
    fontWeight: "500",
    marginHorizontal: 16,
  },
  Primary: {
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: SystemColors.primary,
    borderRadius: 0,
    width: "90%",
    fontWeight: "500",
    marginHorizontal: 16,
    height: 48,
  },

  Secondary: {
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 0,
    width: "90%",
    borderWidth: 1,
    borderColor: SystemColors.primary,
    marginHorizontal: 16,
    height: 48,
  },
  Success: {
    textAlign: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "#2BC155",
    width: "90%",
    marginHorizontal: 16,
    borderRadius: 0,
  },

  Loading: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#ccddf8",
    borderRadius: 0,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    height: 48,
  },

  Text: {
    marginHorizontal: 12,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  SecondaryText: {
    marginHorizontal: 12,
    fontSize: 20,
    color: SystemColors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
});
