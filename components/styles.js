import { StyleSheet } from "react-native";

// calculating the
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const paddingBoxHeight = screenWidth * 0.06;
const titleBoxHeight = screenHeight - 0.44 * screenHeight - paddingBoxHeight;

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
    flexShrink: 1,
    flexBasis: titleBoxHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paddingBox: {
    flexBasis: paddingBoxHeight,
    flexShrink: 2,
    minHeight: 0,
  },
  contentbox: {
    flex: 0,
    backgroundColor: colors.box,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "44%",
  },
  wrapper: {
    flex: 0,
    flexGrow: 1,
    width: "88%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 2,
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
    marginVertical: 8,
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
  actionBtnWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  smolCircle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    margin: 5,
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 2,
  },
  mapBorder: {
    alignself: "center",
    width: "100%",
    height: "auto",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white",
    overflow: "hidden",
  },
});
