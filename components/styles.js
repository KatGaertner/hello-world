import { StyleSheet } from "react-native";

const colors = {
  primary: "#757083",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  contentbox: {
    backgroundColor: "#FFFFFF",
    width: "88%",
    height: "44%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "88%",
    height: "88%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.primary,
  },
  button_text: {
    fontWeight: "600",
    color: "#FFFFFF",
  },
  textInput_text: {
    fontWeight: "300",
    color: colors.primary,
    opacity: "50%",
  },
  textInput: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    borderColor: colors.primary,
    fontWeight: "300",
    color: colors.primary,
    // opacity: 0.5,
  },
  bigitem: {
    width: "100%",
    paddingVertical: 5,
  },
  circleWrapper: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  circleselected: {
    borderWidth: 5,
    borderColor: "white",
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});

export default styles;
