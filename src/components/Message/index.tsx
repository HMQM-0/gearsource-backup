import "./scss/index.scss";
import { Box } from "@mui/material";
import * as React from "react";
import { ReactSVG } from "react-svg";
import closeImg from "../../images/x.svg";

interface MessageProps {
  title: string;
  status?: "success" | "error";
  onClose: () => void;
}

const Message: React.FC<MessageProps> = ({
  title,
  status = "neutral",
  children,
  onClose,
}) => (
  <Box className={`message message__status-${status}`}>
    <p className="message__title">{title}</p>
    {children ? <Box className="message__content">{children}</Box> : null}
    <ReactSVG
      src={closeImg}
      className="message__close-icon"
      onClick={onClose}
    />
  </Box>
);

export default Message;
