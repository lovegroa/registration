import {useState, FormEvent, ChangeEvent, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/user.context';
import {signInAuthUserWithEmailAndPassword} from '../../utils/firebase';

import Button from '../../components/button/button.component';
import {
  FormContainer,
  FormWrapper,
  Input,
  InputWrapper,
  Label,
} from '../../components/form/form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

export default function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;
  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await signInAuthUserWithEmailAndPassword(email, password);
    console.log({response});
    if (!response) return;
    setCurrentUser(response.user);
    resetFormFields();
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <br />
        <FormWrapper onSubmit={onSubmitHandler}>
          <InputWrapper>
            <Label>E-mail</Label>
            <Input
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChangeEventHandler}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <Label>Password</Label>
            <Input
              required
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChangeEventHandler}
            ></Input>
          </InputWrapper>
          <Button type="submit" text="Sign in" />
        </FormWrapper>
        <br />
        <h3
          style={{cursor: 'pointer'}}
          onClick={() => {
            navigate('/sign-up');
          }}
        >
          Not registered? Sign up here
        </h3>
      </FormContainer>
    </>
  );
}
