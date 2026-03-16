import styled from 'styled-components';

export const Shell = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  line-height: 1.1;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSubtle};
  max-width: 38rem;
`;

export const Icon = styled.img`
  width: 1rem;
  height: 1rem;
`;
