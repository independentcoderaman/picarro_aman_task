import { memo } from 'react';
import { Input } from '../Input/Input';

export const NumberInput = memo(function NumberInput(props) {
  return <Input inputMode="numeric" {...props} />;
});
