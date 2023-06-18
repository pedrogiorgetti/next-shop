import { styled } from '../index';

export const ErrorMessageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '100%',

  strong: {
    color: '#e57878',
    fontWeight: 'bold',
    fontSize: '$md',
  },
});
