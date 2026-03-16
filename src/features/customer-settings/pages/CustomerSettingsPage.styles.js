import styled from 'styled-components';

export const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 3rem 1.5rem;
`;

export const Frame = styled.div`
  width: min(100%, ${({ theme }) => theme.layout.pageMaxWidth});
  display: flex;
  justify-content: center;
`;

export const Card = styled.section`
  width: min(100%, ${({ theme }) => theme.layout.cardMaxWidth});
  margin: 0 auto;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: clamp(1.5rem, 2vw, 2rem);
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const MetaGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const MetaCard = styled.article`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  padding: 1rem;
`;

export const MetaLabel = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const MetaValue = styled.strong`
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ScenarioBanner = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: 5px;
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  background: rgba(16, 97, 255, 0.05);
  padding: 1rem 1.125rem;
`;

export const ScenarioTitle = styled.strong`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ScenarioText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSubtle};
`;
