import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: var(--transition);
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'warning' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$variant) {
      case 'secondary': return 'var(--secondary-color)';
      case 'danger': return 'var(--danger-color)';
      case 'warning': return 'var(--warning-color)';
      default: return 'var(--primary-color)';
    }
  }};
  transition: var(--transition);

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const Grid = styled.div` 
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

export const Flex = styled.div<{ $direction?: 'row' | 'column', $justify?: string, $align?: string }>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  justify-content: ${props => props.$justify || 'flex-start'};
  align-items: ${props => props.$align || 'center'};
  gap: 1rem;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid var(--primary-color);
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`; 