import {useEffect} from 'react';
import Navbar from '../../components/nav/nav.component';

export default function Homepage() {
  useEffect(() => {
    window.history.pushState({}, '', '/');
  }, []);

  return (
    <>
      <main style={{width: '100vw'}}>
        <Navbar />
        <h1>Homepage</h1>
      </main>
    </>
  );
}
