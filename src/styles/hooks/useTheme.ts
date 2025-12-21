import { useColorScheme } from "react-native";
import { lightTheme } from "../theme/light";
import { darkTheme } from "../theme/dark";
import { useThemeStore } from "../../store/theme.store";

export function useTheme() {
  const scheme = useColorScheme();
  const mode = useThemeStore((s) => s.mode);

  if (mode === "light") return lightTheme;
  if (mode === "dark") return darkTheme;

  return scheme === "dark" ? darkTheme : lightTheme;
}
 