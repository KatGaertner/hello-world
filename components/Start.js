import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import styles from "./styles";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");

  const bgcolors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [backgroundColor, setBackgroundColor] = useState(bgcolors[0]);

  const backgroundImage = "../assets/images/BackgroundImage.png";

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(backgroundImage)}
        resizeMode="cover"
        style={[styles.backgroundImage, styles.container]}
      >
        {/* title */}
        <Text style={styles.title}>App Title</Text>

        {/* box */}
        <View style={styles.contentbox}>
          <View style={styles.wrapper}>
            {/* name input */}
            <View style={styles.bigitem}>
              <Text style={styles.text}>Your name:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                value={name}
                onChangeText={setName}
                accessibilityLabel="Your name"
              ></TextInput>
            </View>

            {/* background color chooser */}
            <View style={styles.bigitem}>
              <Text style={styles.text}>Choose Background Color:</Text>
              <View style={styles.circleWrapper} accessibilityRole="radiogroup">
                {/* render the four circles via .map */}
                {bgcolors.map((bgcolor) => {
                  return (
                    <TouchableOpacity
                      accessibilityRole="radio"
                      style={[
                        styles.circle,
                        { backgroundColor: bgcolor },
                        // add another styling if selected
                        backgroundColor === bgcolor
                          ? styles.circleselected
                          : null,
                      ]}
                      accessibilityState={{
                        checked: backgroundColor === bgcolor ? true : false,
                      }}
                      key={bgcolor}
                      onPress={() => setBackgroundColor(bgcolor)}
                    ></TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* button */}
            <TouchableOpacity
              accessibilityRole="button"
              style={[styles.bigitem, styles.button]}
              onPress={() => {
                navigation.navigate("Chat", {
                  name: name,
                  backgroundColor: backgroundColor,
                });
              }}
            >
              <Text style={[styles.text, styles.button_text]}>
                Start Chatting
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Start;
