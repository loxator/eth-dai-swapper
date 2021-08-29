import React from "react";
import styled, { keyframes } from "styled-components";

// Create the keyframes
const rotate = keyframes`
0%, 100% {
    opacity: 0;
  }

  72% {
    opacity: 1;
  }
`;

interface IMessageDiv {
  success: boolean;
}
const MessageDiv = styled.div<IMessageDiv>`
  opacity: 0;
  animation: ${rotate} 5s ease-in-out 0s 1;
  background-color: ${({ success }) => (success ? "green" : "red")};
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100vw;
`;

interface IMessage {
  message: string;
  type: string;
}
const Message: React.FC<IMessage> = ({ message, type }) => {
  return <MessageDiv success={type === "success"}>{message}</MessageDiv>;
};

export default Message;
