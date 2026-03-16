import { memo } from 'react';
import { BaseInput, FieldError, FieldLabel, FieldShell, RequiredMark } from './Input.styles';

export const Input = memo(function Input({ id, label, error, required, ...restProps }) {
  return (
    <FieldShell>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <RequiredMark>*</RequiredMark> : null}
      </FieldLabel>
      <BaseInput id={id} $hasError={Boolean(error)} {...restProps} />
      <FieldError>{error || ' '}</FieldError>
    </FieldShell>
  );
});
