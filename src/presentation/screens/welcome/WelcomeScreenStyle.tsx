import { StyleSheet } from "react-native";
import { colors } from "../../../config/theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 80,
    backgroundColor:colors.background
  },
  textContainer: {
    paddingHorizontal: 30,
    marginTop: 100,
  },
  title: {
    color: "#fff",
    fontSize: 60,
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
});

export default styles;
