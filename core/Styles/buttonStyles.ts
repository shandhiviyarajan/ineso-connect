/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
import {StyleSheet} from 'react-native';
import { AppColors } from './theme';

const button = StyleSheet.create({
  base: {
    borderRadius:1
  },
  primary:{
    color:AppColors().colors.PRIMARY
  },
  secondary: {},
  small:{},
  medium:{},
  large:{}
 
});

export const buttonPrimary = StyleSheet.flatten([
  Button.base,
  Button.primary,
]);

export const buttonSecondary = StyleSheet.flatten([
  Button.base,
  Button.secondary,
]);

export const buttonSmall = StyleSheet.flatten([
  Button.small,
]);

export const buttonMedium = StyleSheet.flatten([
  Button.medium,
]);

export const buttonLarge = StyleSheet.flatten([
  Button.large,
]);


