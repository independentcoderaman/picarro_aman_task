import styled from 'styled-components';

export const Shell = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

export const SaveStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 5.5rem;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 0.95rem;
  font-weight: 600;
`;
