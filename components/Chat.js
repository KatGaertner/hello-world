import { View, KeyboardAvoidingView, Text } from "react-native";
import { useEffect, useState } from "react";
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Day,
  Time,
  Send,
} from "react-native-gifted-chat";
import { colors } from "./styles";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, theme } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // ------ interface styling

  const renderCustomBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.leftBubble.bg,
          },
          right: {
            backgroundColor: colors.rightBubble.bg,
          },
        }}
        textStyle={{
          left: {
            color: colors.leftBubble.text,
          },
          right: {
            color: colors.rightBubble.text,
          },
        }}
      />
    );
  };
  const renderCustomSystemMessage = (props) => {
    return (
      <SystemMessage {...props} textStyle={{ color: theme.statusTextColor }} />
    );
  };
  const renderCustomDay = (props) => {
    return <Day {...props} textStyle={{ color: theme.statusTextColor }} />;
  };
  const renderCustomTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: colors.leftBubble.statusText,
          },
          right: {
            color: colors.rightBubble.statusText,
          },
        }}
      />
    );
  };
  const renderCustomSend = (props) => {
    return <Send {...props} textStyle={{ color: theme.sendColor }} />;
  };

  // ------ messaging logic

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

  // ------ render

  return (
    <View style={[{ flex: 1, backgroundColor: theme.bgColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderAvatar={() => null}
        renderBubble={renderCustomBubble}
        renderSystemMessage={renderCustomSystemMessage}
        renderDay={renderCustomDay}
        renderTime={renderCustomTime}
        renderSend={renderCustomSend}
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
