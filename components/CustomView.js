import MapView, { Marker, Circle } from "react-native-maps";
import { View } from "react-native";

import { styles } from "./styles";

const CustomView = (props) => {
  const { currentMessage } = props;

  //   https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-354029449
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

  if (currentMessage.location) {
    return (
      <View
        style={[
          styles.mapBorder,
          { borderColor: props.wrapperStyle[props.position].backgroundColor },
        ]}
      >
        <MapView
          style={{ width: 250, height: 170, borderRadius: 10 }}
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
      </View>
    );
  }
  return null;
};

export default CustomView;
