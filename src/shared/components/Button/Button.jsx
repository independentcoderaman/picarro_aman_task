import { memo } from 'react';
import { StyledButton } from './Button.styles';

export const Button = memo(function Button({
  children,
  type = 'button',
  variant = 'primary',
  ...restProps
}) {
  return (
    <StyledButton type={type} $variant={variant} {...restProps}>
      {children}
    </StyledButton>
  );
});
