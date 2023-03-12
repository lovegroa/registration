import {useEffect} from 'react';
import Card, {CardType} from '../../components/card/card.component';
import Navbar from '../../components/nav/nav.component';
import './homepage.styles.css';

export default function Homepage() {
  useEffect(() => {
    window.history.pushState({}, '', '/');
  }, []);

  const cards: CardType[] = [
    {
      altText: 'strawberries',
      buttonText: 'Learn more',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://fastly.picsum.photos/id/429/400/400.jpg?hmac=5U0ehkbTt_-PPq42GHBfwdspZU0rDG9BAT2gqPOkopc',
      link: '/',
      title: 'Card 1',
    },
    {
      altText: 'big cats',
      buttonText: 'Learn more',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://fastly.picsum.photos/id/219/400/400.jpg?hmac=7kcruQOi8_r7wKqJeDd4NXaYV-sf78rdwCmQlHS61Rc',
      link: '/',
      title: 'Card 2',
    },
    {
      altText: 'card1',
      buttonText: 'Learn more',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://fastly.picsum.photos/id/569/400/400.jpg?hmac=0368dlLxTi-z0EUtYL5CdzjSMBPWRnbpCHf-L--rF5A',
      link: '/',
      title: 'Card 3',
    },
  ];

  return (
    <>
      <main>
        <Navbar />
        <br></br>
        <h1>What's happening</h1>
        <div className="card-container">
          {cards.map(
            ({altText, buttonText, description, imageUrl, link, title}) => (
              <Card
                altText={altText}
                buttonText={buttonText}
                description={description}
                imageUrl={imageUrl}
                link={link}
                title={title}
              />
            )
          )}
        </div>
      </main>
    </>
  );
}
