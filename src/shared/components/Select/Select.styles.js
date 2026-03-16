import styled from 'styled-components';
import { BaseInput } from '../Input/Input.styles';

export const StyledSelect = styled(BaseInput).attrs({ as: 'select' })`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23627991' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-position: right 0.9rem center;
  background-size: 0.85rem;
  background-repeat: no-repeat;
  padding-right: 2.5rem;
`;
