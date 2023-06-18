import type { AppProps } from 'next/app';

import { Roboto } from '@next/font/google';
import { globalStyles } from '@/styles/global';

import logo from '@/assets/logo.png';
import { Container, Header } from '@/styles/pages/app';
import Image from 'next/image';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <Header>
        <Image src={logo} width={100} alt="Next Shop logo" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
