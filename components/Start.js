import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import { styles, themes } from "./styles";

import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userTheme, setUserTheme] = useState(themes[0]);
  const backgroundImage = "../assets/images/BackgroundImage.png";

  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name,
          theme: userTheme,
          userID: result.user.uid,
        });
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require(backgroundImage)}
        resizeMode="cover"
        style={[styles.pageContainer, styles.backgroundImage]}
      >
        {/* title */}
        <View style={styles.topContainer}>
          <Text style={styles.title}>App Title</Text>
        </View>

        {/* box */}
        <View style={styles.bottomContainer}>
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
                <View
                  style={styles.circleWrapper}
                  accessibilityRole="radiogroup"
                >
                  {/* render the four circles via .map */}
                  {themes.map((theme) => {
                    return (
                      <TouchableOpacity
                        accessibilityRole="radio"
                        accessibilityLabel={theme.name}
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
                  signInUser();
                }}
              >
                <Text style={[styles.text, styles.button_text]}>
                  Start Chatting
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          />
        </View>
        <View style={styles.paddingBox}></View>
      </ImageBackground>
    </View>
  );
};

export default Start;
