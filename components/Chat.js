import { View, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  CustomBubble,
  CustomDay,
  CustomSend,
  CustomSystemMessage,
  CustomTime,
} from "./ChatSubcomponents";

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
        renderBubble={CustomBubble}
        renderSystemMessage={(props) => CustomSystemMessage(props, theme)}
        renderDay={(props) => CustomDay(props, theme)}
        renderTime={CustomTime}
        renderSend={(props) => CustomSend(props, theme)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      />
    </View>
  );
};

export default Chat;
