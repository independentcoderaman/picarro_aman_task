import { memo } from 'react';
import { Button } from '../Button/Button';
import { Message, Shell } from './ErrorState.styles';

export const ErrorState = memo(function ErrorState({ message, actionLabel, onAction }) {
  return (
    <Shell>
      <Message>{message}</Message>
      {actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </Shell>
  );
});
