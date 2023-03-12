import {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/user.context';
import {
  createAuthUserWithEmailAndPassword,
  CreateUserDocumentFromAuth,
  uploadImage,
} from '../../utils/firebase';

import {
  FormContainer,
  FormWrapper,
  Input,
  InputWrapper,
  Label,
} from '../../components/form/form.styles';
import Button from '../../components/button/button.component';
import {Icon} from '../../components/icon/icon.styles';

export type Sex = 'male' | 'female' | 'prefer not to say' | '';

type DefaultFormFields = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  sex: Sex;
  dateOfBirth: string;
  profileIcon: File | null;
  termsOfUse: boolean;
};

const defaultFormFields: DefaultFormFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  sex: '',
  dateOfBirth: '',
  profileIcon: null,
  termsOfUse: false,
};

export const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [imagePreview, setImagePreview] = useState<string>('');
  const {
    username,
    email,
    password,
    confirmPassword,
    sex,
    dateOfBirth,
    termsOfUse,
  } = formFields;
  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    //create account
    const response = await createAuthUserWithEmailAndPassword(email, password);
    if (!response) {
      console.log('error occoured creating user');
      return;
    }
    const {user} = response;
    let imageUrl = '';

    //upload image
    if (formFields['profileIcon']) {
      const result = await uploadImage(
        formFields['profileIcon'],
        user.uid,
        'profile'
      );

      if (typeof result === 'string') imageUrl = result;
    }

    //create document with extra data
    CreateUserDocumentFromAuth(
      user,
      username,
      sex,
      dateOfBirth,
      imageUrl,
      termsOfUse
    );

    //log user in
    setCurrentUser(response.user);
  };

  const onChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target;
    switch (event.target.name) {
      case 'profileIcon':
        if (
          event.target instanceof HTMLInputElement &&
          event.target.files?.length
        ) {
          const file = event.target.files?.[0];

          const reader = new FileReader();
          if (file && file.type.startsWith('image/')) {
            setFormFields({
              ...formFields,
              ['profileIcon']: event.target.files[0],
            });
            reader.onload = e => {
              if (e.target) {
                setImagePreview(e.target.result as string);
              }
            };
            reader.readAsDataURL(file);
          }
        } else {
          console.warn('no file selected');
        }
        break;
      case 'sex':
        if (event.target instanceof HTMLSelectElement) {
          setFormFields({
            ...formFields,
            ['sex']: event.target.value as Sex,
          });
        }
        break;
      case 'termsOfUse':
        setFormFields({
          ...formFields,
          ['termsOfUse']: !termsOfUse,
        });
        break;
      default:
        setFormFields({
          ...formFields,
          [name]: value,
        });
        break;
    }
  };

  return (
    <>
      <FormContainer>
        <br />
        <h1>Sign Up</h1>
        <br />
        <FormWrapper onSubmit={onSubmitHandler}>
          <InputWrapper>
            <Label>Username</Label>
            <Input
              required
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={onChangeEventHandler}
            ></Input>
          </InputWrapper>
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
              placeholder="Create a password"
              value={password}
              onChange={onChangeEventHandler}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input
              required
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={onChangeEventHandler}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={'profileIcon'}>Profile icon</Label>
            <Input
              required
              type="file"
              id="profileIcon"
              name="profileIcon"
              accept="image/png, image/jpeg, image/gif"
              onChange={onChangeEventHandler}
            ></Input>
            {imagePreview && (
              <Icon
                style={{margin: '10px auto'}}
                src={imagePreview}
                alt="Selected file preview"
                width="200"
                height="200"
              />
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>Date of birth</Label>
            <Input
              required
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              max={new Date().toISOString().split('T')[0]}
              onChange={onChangeEventHandler}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <Label>Sex</Label>
            <select
              required
              name="sex"
              value={sex}
              onChange={onChangeEventHandler}
            >
              <option value="" disabled selected hidden>
                Please select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </InputWrapper>
          <InputWrapper>
            <Label>
              Terms of Use{' '}
              <a
                target="_blank"
                href="https://menherasenpai.notion.site/457df49475494671807673a0a3346451"
              >
                (Click here to read)
              </a>
            </Label>
            <div>
              <Input
                required
                type="checkbox"
                name="termsOfUse"
                checked={termsOfUse}
                onChange={onChangeEventHandler}
                style={{width: 'auto'}}
              />
              <span> I agree</span>
            </div>
          </InputWrapper>

          <Button text="Sign up" type="submit"></Button>
        </FormWrapper>
        <br />
        <h3
          style={{cursor: 'pointer'}}
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          Registered already? Sign in here
        </h3>
        <br />
      </FormContainer>
    </>
  );
};

export default SignUp;
