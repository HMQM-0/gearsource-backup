import { Box, Alert } from "@mui/material";
import * as React from "react";

// import { Message } from "../Message";
import { IProps } from "./types";

export const NotificationTemplate: React.FC<IProps> = ({
  message,
  options,
  close,
}) => {
  return (
    <>
      <Alert
        style={{
          width: 350,
          minHeight: 64,
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        // @ts-ignore
        severity={options.type}
        onClick={close}
      >
        <Box style={{ fontWeight: 700 }}>{message.title}</Box>
        <Box>{message.actionText}</Box>
        <Box>{message.content}</Box>
      </Alert>
    </>
  );
};

/*

<Message
  actionText={message.actionText}
  status={options.type}
  title={message.title}
  onClick={close}
>
  {message.content}
</Message>

*/
