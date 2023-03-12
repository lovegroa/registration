import {useState, FormEvent, ChangeEvent, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/user.context';
import {signInAuthUserWithEmailAndPassword} from '../../utils/firebase';

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
      <h1>Sign In</h1>
      <form onSubmit={onSubmitHandler}>
        <label>E-mail</label>
        <input
          required
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={onChangeEventHandler}
        ></input>
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          placeholder="Create a password"
          value={password}
          onChange={onChangeEventHandler}
        ></input>
        <button type="submit"></button>
      </form>
      <h3
        style={{cursor: 'pointer'}}
        onClick={() => {
          navigate('/sign-up');
        }}
      >
        Not registered? Sign up here
      </h3>
    </>
  );
}
