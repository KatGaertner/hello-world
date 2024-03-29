import { View, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  CustomBubble,
  CustomDay,
  CustomSend,
  CustomSystemMessage,
  CustomTime,
  CustomInputToolbar,
} from "./ChatSubcomponents";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { name, theme, userID } = route.params;

  useEffect(() => {
    // set title of page to username
    navigation.setOptions({ title: name });

    let unsubMessages;
    if (isConnected === true) {
      // unregister old listener
      if (unsubMessages) unsubMessages();
      // remove reference to old listener
      unsubMessages = null;

      // subscribe to firestore
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, async (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => addMessage(doc, newMessages));
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // clean up on unmount
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  // add each sent message as a document to the firestore collection
  const onSend = async (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // add each new message to the local list of messages
  const addMessage = (doc, newMessages) => {
    newMessages.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    });
  };

  // store all messages in localstorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // try to load messages from localstorage, or return an empty array
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  return (
    <View style={[{ flex: 1, backgroundColor: theme.bgColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
        renderInputToolbar={(props) => CustomInputToolbar(props, isConnected)}
        renderAvatar={() => null}
        showAvatarForEveryMessage={true}
        renderUsernameOnMessage={true}
        renderBubble={CustomBubble}
        renderSystemMessage={(props) => CustomSystemMessage(props, theme)}
        renderDay={(props) => CustomDay(props, theme)}
        renderTime={CustomTime}
        renderSend={(props) => CustomSend(props, theme)}
        renderActions={(props) => CustomActions(props, theme, storage)}
        renderCustomView={CustomView}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      />
    </View>
  );
};

export default Chat;
