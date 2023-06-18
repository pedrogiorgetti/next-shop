import { ErrorMessageContainer } from '@/styles/components/errorMessage';
import { ComponentIsVisible } from '../isVisible';

interface IComponentErrorMessageProps {
  isVisible: boolean;
  message: string;
}

export function ComponentErrorMessage({
  isVisible,
  message,
}: IComponentErrorMessageProps) {
  return (
    <ComponentIsVisible when={isVisible}>
      <ErrorMessageContainer>
        <strong>{message}</strong>
      </ErrorMessageContainer>
    </ComponentIsVisible>
  );
}
