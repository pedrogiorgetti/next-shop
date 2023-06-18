import Image from 'next/image';

import { HomeContainer, Product } from '@/styles/pages/home';

import { useKeenSlider } from 'keen-slider/react';

import { GetStaticProps } from 'next';
import IProduct from '@/models/Product';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { pages } from '@/constants';
import Head from 'next/head';

import 'keen-slider/keen-slider.min.css';

interface IHomeProps {
  products: IProduct[];
}

export default function Home({ products }: IHomeProps) {
  const [sliderRef, _] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 24,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      '(min-width: 1240px)': {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>Products | Next.JS Stripe shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Product
            href={pages.product(product.id)}
            key={product.id}
            className="keen-slider__slide"
            prefetch={false}
          >
            <Image
              src={product.imageUrl}
              alt={`${product.name} image`}
              width={520}
              blurDataURL={product.imageUrl}
              placeholder="blur"
              height={480}
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products: IProduct[] = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    const priceFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount ? price.unit_amount / 100 : 0);

    return {
      name: product.name,
      price: priceFormatted,
      id: product.id,
      imageUrl: product.images[0] || '',
      priceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // Revalidate in each 2 hours
  };
};
