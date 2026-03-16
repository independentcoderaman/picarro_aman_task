import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    color-scheme: light;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background:
      radial-gradient(circle at top left, rgba(15, 139, 255, 0.14), transparent 24%),
      radial-gradient(circle at top right, rgba(26, 167, 114, 0.1), transparent 28%),
      linear-gradient(180deg, #f7fbff 0%, ${({ theme }) => theme.colors.background} 100%);
    color: ${({ theme }) => theme.colors.text};
  }

  body,
  button,
  input,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
