import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;
