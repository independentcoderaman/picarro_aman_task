import styled from 'styled-components';

export const Shell = styled.section`
  display: grid;
  justify-items: start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSubtle};
`;
