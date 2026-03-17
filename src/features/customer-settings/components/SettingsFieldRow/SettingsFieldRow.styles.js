import styled from 'styled-components';

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(10rem, 14rem) 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-weight: 700;
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;
