import styled from 'styled-components';

export const FieldShell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FieldLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export const FieldError = styled.span`
  min-height: 1rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
`;

export const BaseInput = styled.input`
  width: 100%;
  min-height: 3rem;
  border-radius: 5px;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.85rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color ${({ theme }) => theme.transitions.standard},
    box-shadow ${({ theme }) => theme.transitions.standard};

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;
