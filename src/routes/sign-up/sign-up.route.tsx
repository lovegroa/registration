import {ChangeEvent, FormEvent, useState} from 'react';
import {
  createAuthUserWithEmailAndPassword,
  CreateUserDocumentFromAuth,
  uploadImage,
} from '../../utils/firebase';

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

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
  };

  const onChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target;
    console.log({name, value});
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
    <form onSubmit={onSubmitHandler}>
      <label>Username</label>
      <input
        required
        type="text"
        name="username"
        placeholder="Enter your username"
        value={username}
        onChange={onChangeEventHandler}
      ></input>
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
      <label>Confirm Password</label>
      <input
        required
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={onChangeEventHandler}
      ></input>
      <label>Profile icon</label>
      <input
        required
        type="file"
        name="profileIcon"
        accept="image/png, image/jpeg, image/gif"
        onChange={onChangeEventHandler}
      ></input>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Selected file preview"
          width="200"
          height="200"
        />
      )}
      <label>Date of birth</label>
      <input
        required
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        max={new Date().toISOString().split('T')[0]}
        onChange={onChangeEventHandler}
      ></input>
      <label>Sex</label>
      <select required name="sex" value={sex} onChange={onChangeEventHandler}>
        <option value="" disabled selected hidden>
          What is your sex?
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="prefer not to say">Prefer not to say</option>
      </select>
      <label>Terms of Use</label>
      <input
        required
        type="checkbox"
        name="termsOfUse"
        checked={termsOfUse}
        onChange={onChangeEventHandler}
      ></input>
      <button type="submit"></button>
    </form>
  );
};

export default SignUp;
