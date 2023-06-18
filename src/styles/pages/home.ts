import Link from 'next/link';
import { styled } from '../index';

export const HomeContainer = styled('main', {
  display: 'flex',
  marginLeft: 'auto',
  minHeight: 656,
  maxWidth: '100%',
  width: '100%',

  '@media (min-width: 1240px)': {
    maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  },
});

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',

  minWidth: '100%',

  img: {
    objectFit: 'contain',
    maxWidth: '100%',
  },

  footer: {
    position: 'absolute',
    bottom: '.25rem',
    left: '.25rem',
    right: '.25rem',
    padding: '2rem',

    borderRadius: 6,

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '$white',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all .2s ease-in-out',

    strong: {
      fontSize: '$lg',
    },
    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green500',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
});
