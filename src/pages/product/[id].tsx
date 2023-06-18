import 'react-loading-skeleton/dist/skeleton.css';

import { ComponentErrorMessage } from '@/components/ErrorMessage';
import { ComponentIsVisible } from '@/components/isVisible';
import { stripe } from '@/lib/stripe';
import IProduct from '@/models/Product';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
  Row,
} from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Skeleton from 'react-loading-skeleton';
import Stripe from 'stripe';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Head from 'next/head';

interface IProductProps {
  product?: IProduct;
  errorMessage?: string;
}

interface IHandleManageQuantityData {
  increase: boolean;
}

export default function Product({ errorMessage, product }: IProductProps) {
  const { isFallback } = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false);

  const handleManageQuantity = useCallback(
    (data?: IHandleManageQuantityData) => {
      setQuantity(currentQuantity => {
        if (data?.increase) {
          currentQuantity = currentQuantity + 1;
        } else {
          currentQuantity = currentQuantity - 1;
        }

        return currentQuantity;
      });
    },
    [],
  );

  const handleBuyProduct = useCallback(async () => {
    try {
      if (!product) {
        toast.error('Product to create the checkout not found!');

        return;
      }

      setIsCreatingCheckoutSession(true);

      const {
        data: { checkout: checkoutUrl },
      } = await axios.post('/api/checkout', {
        priceId: product.priceId,
        quantity,
      });

      window.open(checkoutUrl, '_blank');

      setIsCreatingCheckoutSession(false);
    } catch (error: any) {
      setIsCreatingCheckoutSession(false);

      toast.error('Error while creating the checkout, sorry!');
    }
  }, [quantity, product, toast]);

  return (
    <>
      <Head>
        <title>{product?.name} | Next.JS Stripe shop</title>
      </Head>

      <ComponentErrorMessage
        isVisible={!product && !!errorMessage && !isFallback}
        message={errorMessage as string}
      />

      <ComponentIsVisible when={!!product}>
        <ProductContainer>
          <ComponentIsVisible when={isFallback}>
            <Skeleton
              baseColor="#33333320"
              highlightColor="#33333315"
              width={576}
              height={656}
            />
          </ComponentIsVisible>
          <ComponentIsVisible when={!isFallback}>
            <ImageContainer>
              <Image
                src={product?.imageUrl as string}
                alt={`${product?.name} image`}
                width={520}
                blurDataURL={product?.imageUrl}
                placeholder="blur"
                height={480}
              />
            </ImageContainer>
          </ComponentIsVisible>

          <ProductDetails>
            <h1>
              <ComponentIsVisible when={isFallback}>
                <Skeleton baseColor="#33333320" highlightColor="#33333315" />
              </ComponentIsVisible>
              <ComponentIsVisible when={!isFallback}>
                {product?.name}
              </ComponentIsVisible>
            </h1>
            <span>
              <ComponentIsVisible when={isFallback}>
                <Skeleton baseColor="#33333320" highlightColor="#33333315" />
              </ComponentIsVisible>
              <ComponentIsVisible when={!isFallback}>
                {product?.price}
              </ComponentIsVisible>
            </span>

            <p>
              <ComponentIsVisible when={isFallback}>
                <Skeleton
                  baseColor="#33333320"
                  highlightColor="#33333315"
                  count={5}
                />
              </ComponentIsVisible>
              <ComponentIsVisible when={!isFallback}>
                {product?.description}
              </ComponentIsVisible>
            </p>

            <Row>
              <div>
                <button
                  className="decrease"
                  disabled={quantity === 1}
                  onClick={() => handleManageQuantity()}
                  type="button"
                >
                  <FiMinus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleManageQuantity({ increase: true })}
                  type="button"
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <button
                disabled={isFallback || isCreatingCheckoutSession}
                onClick={handleBuyProduct}
                type="button"
              >
                Buy now
              </button>
            </Row>
          </ProductDetails>
        </ProductContainer>
      </ComponentIsVisible>
      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            iconTheme: {
              primary: '#d85b5b',
              secondary: '#FFF',
            },
            style: {
              background: '#a34444',
              color: '#FFF',
              padding: '8px 24px',
              columnGap: '12px',
              fontSize: '16px',
            },
          },
        }}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Sending only one component and using the fallback to load the other ones

  return {
    paths: [
      {
        params: { id: 'prod_NQLvuxXDGPuUNB' },
      },
    ],
    fallback: true,
  };
};

interface IGetStaticPropsParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  IProductProps,
  IGetStaticPropsParams
> = async ({ params }) => {
  if (!params) {
    return {
      props: { errorMessage: 'Product not found' },
    };
  }

  const product = await stripe.products.retrieve(params.id, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price.unit_amount ? price.unit_amount / 100 : 0);

  const productFormatted: IProduct = {
    id: product.id,
    name: product.name,
    description: product.description || 'There is no description',
    imageUrl: product.images[0],
    price: priceFormatted,
    priceId: price.id,
  };

  return {
    props: { product: productFormatted },
    revalidate: 60 * 60 * 1, // Revalidate in each 1 hour
  };
};
