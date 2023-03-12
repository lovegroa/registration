import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* height: 100%; */
  /* width: 100%; */
  padding: 20px;
  h3 {
    color: white;
    font-size: 1rem;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px black;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  display: inline-block;

  ::file-selector-button {
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
  }
`;
