import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;