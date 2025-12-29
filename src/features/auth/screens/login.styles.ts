import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logoBox: {
    alignItems: "center",
    marginBottom: 24,
  },

  logoText: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#111",
  },

  desc: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 32,
  },

  buttonBox: {
    gap: 12,
  },

  button: {
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Google 로그인 */
  googleButton: {
    backgroundColor: "#F2F2F2",
  },

  googleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  /* 휴대폰 로그인 */
  phoneButton: {
    backgroundColor: "#111",
  },

  phoneText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },

  footerText: {
    marginTop: 32,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
});
