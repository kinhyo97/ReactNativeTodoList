import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const selectPlatform = <T>(options: {
  web?: T;
  ios?: T;
  android?: T;
  default: T;
}) => {
  if (isWeb && options.web !== undefined) return options.web;
  if (isIOS && options.ios !== undefined) return options.ios;
  if (isAndroid && options.android !== undefined) return options.android;
  return options.default;
};
