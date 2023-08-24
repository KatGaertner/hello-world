import { TouchableOpacity, View, Text, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { styles } from "./styles";

import { uriToBlob } from "../util/uriToBlob";

const CustomActions = (props, theme, storage) => {
  // using the permission methods from the library
  const [cameraPermissions, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [imagePickerPermissions, requestImagePickerPermissions] =
    ImagePicker.useMediaLibraryPermissions();
  const [mediaLibraryPermissions, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();

  const { onSend, user } = props;

  const actionSheet = useActionSheet();

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${user._id}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    const blob = await uriToBlob(imageURI);
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    try {
      const snapshot = await uploadBytes(newUploadRef, blob);
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    } catch (error) {
      Alert.alert("Error", "Could not upload image.");
      console.log(error);
    }
  };

  const saveImage = async (result) => {
    let permission = await requestMediaLibraryPermission();
    if (permission?.granted) {
      try {
        await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Could not save image to your phone.");
      }
    } else {
      Alert.alert("Permission denied", "Can't save image to your phone.");
    }
  };

  const pickImage = async () => {
    let permission = await requestImagePickerPermissions();
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

  const takePhoto = async () => {
    let permission = await requestCameraPermission();
    if (permission?.granted) {
      try {
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
          await saveImage(result);
        }
      } catch (error) {
        Alert.alert("Error", "Could not get camera.");
        console.log(error);
      }
    } else {
      Alert.alert("Permission denied", "Can't get camera.");
    }
  };

  const sendLocation = async () => {
    let permission = await requestLocationPermission();
    if (permission?.granted) {
      Location.getCurrentPositionAsync({})
        .then((location) => {
          onSend({
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              accuracy: location.coords.accuracy,
            },
          });
        })
        .catch((e) => {
          console.log(e);
          Alert.alert("Error", "Could not get location.");
        });
    } else {
      Alert.alert("Permission denied", "Can't get location.");
    }
  };

  const onActionPress = () => {
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
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
          case 1:
            takePhoto();
            return;
          case 2:
            sendLocation();
          default:
        }
      }
    );
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
