import { StyleSheet } from "react-native";

export const colors = {
  box: "#FFF",
  primary: "#757083",
  leftBubble: { bg: "#FFF", text: "#000", statusText: "#767676" },
  rightBubble: { bg: "#FCFFEB", text: "#000", statusText: "#757766" },
};

export const themes = [
  {
    bgColor: "#090C08",
    name: "black",
    statusTextColor: "#787a77",
    sendColor: "#172612",
  },
  {
    bgColor: "#474056",
    name: "violet",
    statusTextColor: "#B4ACC1",
    sendColor: "#4d3d70",
  },
  {
    bgColor: "#8A95A5",
    name: "blue grey",
    statusTextColor: "#292E36",
    sendColor: "#596d8c",
  },
  {
    bgColor: "#B9C6AE",
    name: "light green",
    statusTextColor: "#48543D",
    sendColor: "#657b53",
  },
  // {
  //   bg: "white",
  //   name: "high contrast",
  //   statusTextColor: "black",
  // },
];

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentbox: {
    backgroundColor: colors.box,
    width: "88%",
    height: "88%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "88%",
    height: "88%",
    justifyContent: "space-evenly",
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
    marginVertical: 5,
  },
  circleWrapper: {
    flexDirection: "row",
    marginTop: 5,
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
