import { styled } from '../index';

export const ProductContainer = styled('main', {
  display: 'grid',
  alignItems: 'stretch',
  gap: '4rem',

  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const ImageContainer = styled('div', {
  width: '100%',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'contain',
    maxWidth: '100%',
  },

  '@media (min-width: 768px)': {
    maxWidth: 576,
    height: 656,
  },
  '@media (min-width: 1240px)': {
    maxWidth: 576,
    height: 656,
  },
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
    marginLeft: 'auto',
    textAlign: 'right',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },
});

export const Row = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  columnGap: '.5rem',

  marginTop: '2rem',

  width: '100%',

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,

    border: 0,
    borderRadius: 8,

    height: 40,
    width: 40,

    backgroundColor: '$blue600',
    color: '$white',

    cursor: 'pointer',
    fontWeight: 'bold',

    transition: 'all 0.5s ease-in-out',

    '&:not(:disabled):hover': {
      backgroundColor: '$blue500',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    columnGap: '.25rem',

    width: 'fit-content',

    span: {
      fontSize: '$md',

      backgroundColor: '$gray300',
      color: '$gray600',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 8,
      marginTop: 0,

      height: 40,
      width: 40,
    },

    button: {
      backgroundColor: '$green500',
      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },
      '&.decrease': {
        backgroundColor: '$red500',
        '&:not(:disabled):hover': {
          backgroundColor: '$red300',
        },
      },
    },
  },

  '@media (min-width: 768px)': {
    columnGap: '1rem',

    marginTop: 'auto',

    button: {
      width: 56,
      height: 56,
    },

    span: {
      width: 56,
      height: 56,
    },
  },
});
