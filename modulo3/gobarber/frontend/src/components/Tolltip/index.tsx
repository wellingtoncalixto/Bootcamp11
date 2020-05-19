import React from 'react';

import { Container } from './styles';

interface Props {
  title: string;
  className?: string;
}

const Tolltip: React.FC<Props> = ({ children, title, className = '' }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tolltip;
