import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
};

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 2.75rem;
  border-radius: 5px;
  padding: 0.75rem 1.1rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  :hover{
    cursor: pointer;
  }
  transition:
    background ${({ theme }) => theme.transitions.standard},
    border-color ${({ theme }) => theme.transitions.standard};

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`;
