import {StyledButton} from './button.styles';

export const Button = ({
  type,
  text,
}: {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
}) => {
  return <StyledButton type={type}>{text}</StyledButton>;
};
export default Button;
