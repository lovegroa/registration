import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: grey;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: width 0.3s ease-out, height 0.3s ease-out;
  }
  :hover:before {
    width: 200%;
    height: 200%;
  }
  :hover {
    cursor: pointer;
  }
`;
