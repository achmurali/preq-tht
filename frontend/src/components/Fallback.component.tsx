import React from 'react';
import { FallbackProps } from 'react-error-boundary';

export const Fallback: React.FC<FallbackProps> = ({ error }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre style={{ color: 'red' }}>{error.message}</pre>
  </div>
);
