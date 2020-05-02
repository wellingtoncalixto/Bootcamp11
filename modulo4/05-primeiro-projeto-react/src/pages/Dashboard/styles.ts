import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 50px;
  margin-top: 80px;
`;


interface PropsForm {
  hasError: boolean
}
export const Form = styled.form<PropsForm>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    width: 60%;
    height: 70px;
    padding: 0 24px;
    border: 1px solid transparent;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;


    ${props => props.hasError && css`
      border: 1px solid #c53030;
      border-right: 0;
    `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 40%;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    color: #fff;
    border: 0;
    font-weight: bold;
    transition: bachground-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 10px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin-left: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cdcdcb;
    }
  }
`;

export const ErrorText = styled.span`
  color: #c53030;
  margin-top: 10px;
`;
