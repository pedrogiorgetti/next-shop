import { styled } from '../index';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',

  columnGap: '2rem',
  padding: '1.5rem',

  '@media (min-width: 1024px)': {
    padding: '3rem 0 3rem 3rem',
  },

  '@media (min-width: 1240px)': {
    padding: 0,
  },
});

export const Header = styled('header', {
  margin: '0 auto',
  maxWidth: 1180,
  width: '100%',

  display: 'flex',
  justifyContent: 'center',

  '@media (min-width: 768px)': {
    justifyContent: 'flex-start',
  },
});
