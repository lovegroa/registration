import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MainContainer = styled.main`
  padding: 20px;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  color: black;
  padding: 20px;
  h1 {
    max-width: calc(100% - 200px);
    word-wrap: break-word;
  }
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  color: black;
  padding: 20px;
  ul {
    all: unset;
    display: flex;
    flex-direction: column;
  }
  li {
    all: unset;
  }
`;
