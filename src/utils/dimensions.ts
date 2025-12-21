import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const vw = (percent: number) => (SCREEN_WIDTH * percent) / 100;
export const vh = (percent: number) => (SCREEN_HEIGHT * percent) / 100;
