import { pages } from '@/constants';
import { stripe } from '@/lib/stripe';
import IProduct from '@/models/Product';
import {
  BackLink,
  ImageContainer,
  ProductImages,
  SuccessContainer,
} from '@/styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useMemo } from 'react';
import Stripe from 'stripe';

interface ISuccessProps {
  products: Pick<IProduct, 'id' | 'imageUrl' | 'name'>[];
  customerName: string;
}

export default function Success({ customerName, products }: ISuccessProps) {
  const productWord = useMemo(() => {
    if (products.length === 1) {
      return 'product';
    }
    return 'products';
  }, []);

  const productImagesColumns = useMemo(() => {
    if (products.length >= 2) {
      return 2;
    }
    return 1;
  }, []);

  return (
    <>
      <Head>
        <title>Purchase done | Next.JS Stripe shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Purchase done!</h1>
        <ProductImages
          css={{ gridTemplateColumns: `repeat(${productImagesColumns}, 1fr)` }}
        >
          {products.map(product => (
            <ImageContainer key={product.id}>
              <Image
                src={product.imageUrl}
                alt={`${product.name} image`}
                blurDataURL={product.imageUrl}
                placeholder="blur"
                height={135}
                width={120}
              />
            </ImageContainer>
          ))}
        </ProductImages>
        <p>
          Oh yeah! <strong>{customerName}</strong>, your {productWord} is
          comming to you!
        </p>

        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>

        <BackLink href={pages.home}>Back to the catalog</BackLink>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      props: {},
      redirect: {
        destination: pages.home,
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  if (!response.customer_details || !response.line_items) {
    return {
      props: {},
    };
  }
  const customerName =
    (response.customer_details.name &&
      response.customer_details.name.toLowerCase()) ||
    '';
  const checkoutProducts = response.line_items.data.map(lineItem => ({
    product: (lineItem.price as Stripe.Price).product as Stripe.Product,
  }));

  const products: Pick<IProduct, 'id' | 'imageUrl' | 'name'>[] =
    checkoutProducts.map(checkoutProduct => ({
      id: checkoutProduct.product.id,
      imageUrl: checkoutProduct.product.images[0],
      name: checkoutProduct.product.name,
    }));

  return {
    props: {
      customerName,
      products,
    },
  };
};
