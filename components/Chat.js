import { Text, View } from "react-native";
import { useEffect } from "react";
import styles from "./styles";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.title}>Hello {name}!</Text>
    </View>
  );
};

export default Chat;
