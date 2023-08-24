import MapView, { Marker, Circle } from "react-native-maps";
import { TouchableOpacity, Linking } from "react-native";

import { styles } from "./styles";

const CustomView = (props) => {
  const { currentMessage } = props;

  // returns a link to open the given location in google maps
  const openMaps = (location) => {
    const url = `http://maps.google.com/?q=${location.latitude},${location.longitude}`;
    const supported = Linking.canOpenURL(url);
    if (supported) {
      return Linking.openURL(url);
    }
    return null;
  };

  // calculate the displayed area for the map display
  // location - object that has a latitude, longitude and accuracy
  // zoomOutFactor - how far to zoom out the map
  // returns an object that can be used in MapView region
  // calculation from https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-354029449
  const getRegion = (location, zoomOutFactor) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = location.accuracy / oneDegreeOfLatitudeInMeters;
    const longitudeDelta =
      location.accuracy /
      (oneDegreeOfLatitudeInMeters *
        Math.cos(location.latitude * (Math.PI / 180)));

    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: latitudeDelta * zoomOutFactor,
      longitudeDelta: longitudeDelta * zoomOutFactor,
    };
  };

  // display a map if the message has a 'location' key
  if (currentMessage.location) {
    return (
      <TouchableOpacity
        onPress={() => openMaps(currentMessage.location)}
        style={[
          styles.mapBorder,
          // from the props, get the color of the wrapper of the left or right bubble
          { borderColor: props.wrapperStyle[props.position].backgroundColor },
        ]}
      >
        <MapView
          style={{ width: 150, height: 100, borderRadius: 10 }}
          region={getRegion(currentMessage.location, 10)}
        >
          <Circle
            center={{
              longitude: currentMessage.location.longitude,
              latitude: currentMessage.location.latitude,
            }}
            radius={currentMessage.location.accuracy}
            strokeColor="rgba(0, 102, 204,1)"
            fillColor="rgba(0, 102, 204,0.5)"
          />
          <Marker
            coordinate={{
              longitude: currentMessage.location.longitude,
              latitude: currentMessage.location.latitude,
            }}
            pinColor="#0066cc"
          />
        </MapView>
      </TouchableOpacity>
    );
  }
  return null;
};

export default CustomView;
