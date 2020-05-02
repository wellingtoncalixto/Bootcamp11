import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Header = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #a8a8b3;
      transition: background-color 2ms;

      &:hover {
        color: #666
      }

      svg {
        margin-right: 5px;
      }
    }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {

    display: flex;
    align-items: center;

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size:36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #727280;
        margin-top: 5px;
      }
    }
  }


  ul {
    display: flex;
    list-style: none;




    li {

      & + li {
      margin-left: 80px;
    }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c6c;
      }
    }
  }

`;

export const Issues = styled.div`
  margin-top: 80px;

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
