import { View, KeyboardAvoidingView } from "react-native";
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

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { name, theme, userID } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });

    // subscribe to firestore
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        });
      });
      setMessages(newMessages);
    });
    // clean up
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const onSend = async (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

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

  // ------ render

  return (
    <View style={[{ flex: 1, backgroundColor: theme.bgColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          userID,
          name,
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
