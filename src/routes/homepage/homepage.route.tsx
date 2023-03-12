import {useEffect} from 'react';

export default function Homepage() {
  useEffect(() => {
    window.history.pushState({}, '', '/');
  }, []);

  return <h1>Homepage</h1>;
}
