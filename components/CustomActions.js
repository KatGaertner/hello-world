import { TouchableOpacity, View, Text, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { styles } from "./styles";

import { uriToBlob } from "../util/uriToBlob";

const CustomActions = (props, theme, storage) => {
  const { onSend, user } = props;

  // definition of action sheet
  const actionSheet = useActionSheet();
  const onActionPress = () => {
    // the displayed options with emoji
    const options = [
      `${String.fromCodePoint(128444)}${String.fromCodePoint(65039)}` +
        "  Send Image from Library",
      `${String.fromCodePoint(128247)}` + "  Send Image from Camera",
      `${String.fromCodePoint(128205)}` + "  Send Location",
      `${String.fromCodePoint(10060)}` + "  Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      // defining the connected actions
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            sendLocation();
            return;
          default:
        }
      }
    );
  };

  // generate reference string for uploading the image
  // from upload time, image uri and user id
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${user._id}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    // get the image from the file uri as a blob
    let blob;
    if (Platform.OS === "android") {
      // using a utility function workaround on android, see more in that file
      blob = await uriToBlob(imageURI);
    } else {
      const response = await fetch(imageURI);
      blob = await response.blob();
    }
    // generate reference string as unique identifier
    const uniqueRefString = generateReference(imageURI);
    // generate reference for the upload to firebase
    const newUploadRef = ref(storage, uniqueRefString);
    try {
      // upload the image
      const snapshot = await uploadBytes(newUploadRef, blob);
      // get the url where the image is uploaded
      const imageURL = await getDownloadURL(snapshot.ref);
      // send message with attached image url
      onSend({ image: imageURL });
    } catch (error) {
      Alert.alert("Error", "Could not upload image.");
      console.log(error);
    }
  };

  // use expo-media-library to save image to phone
  const saveImage = async (imageURI) => {
    let permission = await MediaLibrary.requestPermissionsAsync();
    if (permission?.granted) {
      try {
        await MediaLibrary.saveToLibraryAsync(imageURI);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Could not save image to your phone.");
      }
    } else {
      Alert.alert("Permission denied", "Can't save image to your phone.");
    }
  };

  // use expo-image-picker to get an image from the phone's image library
  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission?.granted) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        }
      } catch (error) {
        Alert.alert("Error", "Could not get image.");
        console.error(error);
      }
    } else {
      Alert.alert("Permission denied", "Can't get images.");
    }
  };

  // use expo-image-picker to take a picture with the phone's camera
  const takePhoto = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission?.granted) {
      try {
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
          await saveImage(result.assets[0].uri);
        }
      } catch (error) {
        Alert.alert("Error", "Could not get camera.");
        console.log(error);
      }
    } else {
      Alert.alert("Permission denied", "Can't get camera.");
    }
  };

  // use expo-location to get and send the phone's location
  const sendLocation = async () => {
    let permission = await Location.requestForegroundPermissionsAsync();
    console.log(permission);
    if (permission?.granted) {
      try {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        if (location) {
          console.log(location);
          // send message with the location added
          onSend({
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              accuracy: location.coords.accuracy,
            },
          });
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Could not get location.");
      }
    } else {
      Alert.alert("Permission denied", "Can't get location.");
    }
  };

  return (
    <TouchableOpacity style={styles.actionBtnWrapper} onPress={onActionPress}>
      <View
        style={[
          styles.smolCircle,
          styles.actionBtnWrapper,
          { backgroundColor: theme.bgColor },
        ]}
      >
        <Text style={[styles.iconText, { color: theme.statusTextColor }]}>
          +
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomActions;
