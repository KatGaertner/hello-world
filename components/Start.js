import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { styles, themes } from "./styles";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userTheme, setUserTheme] = useState(themes[0]);

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
                {themes.map((theme) => {
                  return (
                    <TouchableOpacity
                      accessibilityRole="radio"
                      style={[
                        styles.circle,
                        { backgroundColor: theme.bgColor },
                        // add another styling if selected
                        userTheme === theme
                          ? {
                              borderWidth: 5,
                              borderColor: userTheme.statusTextColor,
                            }
                          : null,
                      ]}
                      accessibilityState={{
                        checked: userTheme === theme ? true : false,
                      }}
                      key={theme.name}
                      onPress={() => setUserTheme(theme)}
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
                  theme: userTheme,
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
