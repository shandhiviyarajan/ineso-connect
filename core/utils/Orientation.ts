import { Dimensions } from "react-native";

export const isPortrait = () => {
  let screen = Dimensions.get("screen");
  return screen.height > screen.width;
};

export const isLandscape = () => {
  let screen = Dimensions.get("screen");
  return screen.height < screen.width;
};
