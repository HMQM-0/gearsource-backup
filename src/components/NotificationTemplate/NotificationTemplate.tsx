import * as React from "react";
import "./scss/index.scss";
import { Box } from "@mui/material";
import { Message } from "..";
import { INotificationTemplate } from "./customTypes";

export const NotificationTemplate: React.FC<INotificationTemplate> = ({
  message,
  options,
  close,
}) => {
  return (
    <Box className="notification">
      <Message title={message.title} status={options.type} onClose={close}>
        {message.content}
      </Message>
    </Box>
  );
};

export default NotificationTemplate;
