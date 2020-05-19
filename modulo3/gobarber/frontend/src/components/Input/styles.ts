import styled, { css } from 'styled-components';
import Tolltip from '../Tolltip';

interface IContainer {
  focus: boolean;
  isFilld: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainer>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  ${(props) =>
    props.focus &&
    css`
      border: 2px solid #ff9000;

      svg {
        color: #ff9000;
      }
    `}

  ${(props) =>
    props.isFilld &&
    css`
      svg {
        color: #ff9000;
      }
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    color: #f4ede8;
    border: 0;
    background: none;
    flex: 1;
    margin-right: 5px;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 10px;
  }
`;

export const Error = styled(Tolltip)`
  height: 20px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #ffff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
