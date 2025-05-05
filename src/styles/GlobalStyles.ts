import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --danger-color: #e74c3c;
    --warning-color: #f39c12;
    --dark-color: #34495e;
    --light-color: #ecf0f1;
    --text-color: #333;
    --border-radius: 4px;
    --box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--light-color);
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`; 