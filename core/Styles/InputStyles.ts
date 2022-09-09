/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
import { StyleSheet } from "react-native";
import { AppColors } from "./theme";

const Button = StyleSheet.create({
  base: {
    borderRadius: 1,
  },
  primary: {
    color: AppColors().colors.PRIMARY,
  },
  secondary: {},
  small: {},
  medium: {},
  large: {},
});

export const FormStyle = StyleSheet.create({
  Input: {
    height:100,
    fontSize: 16,
    color: "#216FED",
    
    textAlign: "left",
    paddingVertical: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(33,111,237,.5)",
    marginVertical: 12,
    width: "80%",
    fontWeight: "500"
  },
  Checkbox:{
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#216FED",
    borderRadius: 5,
    width: 20,
    height: 20,
    marginRight: 6,
  },
  Button:{
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#216FED',
    borderRadius: 4,
  }
});

export const buttonPrimary = StyleSheet.flatten([Button.base, Button.primary]);

export const buttonSecondary = StyleSheet.flatten([
  Button.base,
  Button.secondary,
]);

export const buttonSmall = StyleSheet.flatten([Button.small]);

export const buttonMedium = StyleSheet.flatten([Button.medium]);

export const buttonLarge = StyleSheet.flatten([Button.large]);
