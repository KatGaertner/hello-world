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

export const CustomSystemMessage = (props, theme) => {
  return (
    <SystemMessage {...props} textStyle={{ color: theme.statusTextColor }} />
  );
};
export const CustomDay = (props, theme) => {
  return <Day {...props} textStyle={{ color: theme.statusTextColor }} />;
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
export const CustomSend = (props, theme) => {
  return <Send {...props} textStyle={{ color: theme.sendColor }} />;
};
