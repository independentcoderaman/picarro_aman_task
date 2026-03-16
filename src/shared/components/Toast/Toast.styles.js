import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const variantStyles = {
  success: css`
    border-color: ${({ theme }) => theme.colors.success};
    background: ${({ theme }) => theme.colors.success};
  `,
  error: css`
    border-color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.danger};
  `,
  info: css`
    border-color: ${({ theme }) => theme.colors.warning};
    background: ${({ theme }) => theme.colors.warning};
  `,
};

export const ToastViewport = styled.div`
  position: fixed;
  right: 1.5rem;
  top: 1.5rem;
  z-index: 30;
`;

export const ToastShell = styled.div`
  min-width: 18rem;
  max-width: 24rem;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 1rem 1.125rem;
  color: ${({ theme }) => theme.colors.textInverse};
  box-shadow: ${({ theme }) => theme.shadows.card};
  animation: ${slideIn} 220ms ease;
  ${({ $variant }) => variantStyles[$variant]}
`;
