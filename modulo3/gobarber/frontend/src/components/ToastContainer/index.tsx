import React from 'react';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';
interface Props {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<Props> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message: ToastMessage) => (
        <Toast key={message.id} message={message}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
