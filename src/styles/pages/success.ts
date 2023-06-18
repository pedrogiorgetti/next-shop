import Link from 'next/link';
import { styled } from '../index';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  height: 'calc(100vh - 15rem)',

  margin: '0 auto',

  h1: {
    fontSize: '$2xl',
    marginTop: '6rem',
    marginBottom: '3rem',
    color: '$gray100',
  },

  p: {
    color: '$gray300',

    fontSize: '$xl',
    lineHeight: 1.4,

    marginTop: '2rem',
    maxWidth: 450,

    textAlign: 'center',

    strong: {
      textTransform: 'capitalize',
    },
  },

  ul: {
    marginTop: '2rem',

    li: {
      marginTop: '1rem',

      fontWeight: 'bold',
      fontSize: '$lg',
    },
  },

  '@media (min-width: 768px)': {
    height: 'calc(100vh - 8rem)',
  },
});

export const ProductImages = styled('div', {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',

  gridGap: '.5rem',

  maxWidth: 650,

  position: 'relative',
});

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  width: '100%',
  maxWidth: 130,
  maxHeight: 145,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  img: {
    objectFit: 'contain',
  },
});

export const BackLink = styled(Link, {
  marginTop: '5rem',

  textDecoration: 'none',
  color: '$green500',

  fontWeight: 'bold',
  fontSize: '$lg',

  transition: 'all .3s ease',

  '&:not(:disabled):hover': {
    color: '$green300',
  },
});
