import { memo } from 'react';
import { FieldError, FieldLabel, FieldShell, RequiredMark } from '../Input/Input.styles';
import { StyledSelect } from './Select.styles';

export const Select = memo(function Select({ id, label, error, options, required, ...restProps }) {
  return (
    <FieldShell>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <RequiredMark>*</RequiredMark> : null}
      </FieldLabel>
      <StyledSelect id={id} $hasError={Boolean(error)} {...restProps}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      <FieldError>{error || ' '}</FieldError>
    </FieldShell>
  );
});
