import { View, KeyboardAvoidingView, Text } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";
import styles from "./styles";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={[{ flex: 1, backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderAvatar={() => null}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

export default Chat;
