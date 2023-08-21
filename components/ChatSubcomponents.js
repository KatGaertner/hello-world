import {
  Bubble,
  SystemMessage,
  Day,
  Time,
  Send,
} from "react-native-gifted-chat";
import { colors } from "./styles";

export const CustomBubble = (props) => {
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

export const CustomSystemMessage = (props) => {
  return (
    <SystemMessage {...props} textStyle={{ color: props.statusTextColor }} />
  );
};
export const CustomDay = (props) => {
  return <Day {...props} textStyle={{ color: props.statusTextColor }} />;
};
export const CustomTime = (props) => {
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
export const CustomSend = (props) => {
  return <Send {...props} textStyle={{ color: props.sendColor }} />;
};
