import Button from '../../components/ui/Button/Button.jsx';

export const AuthButton = ({ onClick }) => {
  return <Button label={'Se connecter'} color={'red'} size={'big'} onClick={onClick} />;
};
