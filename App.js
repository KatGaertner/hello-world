import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBC29a6Gl8GWpWNMnww5SgFzFDvTelLp3A",
    authDomain: "hello-world-c9327.firebaseapp.com",
    projectId: "hello-world-c9327",
    storageBucket: "hello-world-c9327.appspot.com",
    messagingSenderId: "119317310252",
    appId: "1:119317310252:web:dd9cf796720520c5fe1a89",
  };
  const app = initializeApp(firebaseConfig);

  // ---- for me, only the second expression works. might be different on different networks.
  // const db = getFirestore(app);
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
  });

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
