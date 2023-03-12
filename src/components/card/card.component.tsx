import {useNavigate} from 'react-router-dom';
import './card.styles.css';
export type CardType = {
  title: string;
  description: string;
  link: string;
  buttonText: string;
  imageUrl: string;
  altText: string;
};

const Card = ({
  title,
  description,
  link,
  buttonText,
  imageUrl,
  altText,
}: CardType) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <img src={imageUrl} alt={altText} className="card-img" />
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button className="button" onClick={() => navigate(link)}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
