import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderShell = styled.div`
  display: inline-flex;
  flex-direction: ${({ $compact }) => ($compact ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  gap: ${({ $compact, theme }) => ($compact ? theme.spacing.xs : theme.spacing.md)};
  width: ${({ $compact }) => ($compact ? 'auto' : '100%')};
  min-height: ${({ $compact, $fullPage }) => ($compact ? 'auto' : $fullPage ? '100vh' : '8rem')};
  padding: ${({ $compact, theme }) => ($compact ? '0' : theme.spacing.lg)};
`;

export const Spinner = styled.span`
  width: ${({ $compact }) => ($compact ? '1rem' : '2.5rem')};
  height: ${({ $compact }) => ($compact ? '1rem' : '2.5rem')};
  border-radius: 50%;
  border: 3px solid rgba(16, 97, 255, 0.16);
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${rotate} 0.8s linear infinite;

  ${({ $compact }) =>
    $compact &&
    css`
      border-width: 2px;
    `}
`;

export const LoaderLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-weight: 600;
`;
