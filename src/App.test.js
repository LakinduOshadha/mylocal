import { render, screen } from '@testing-library/react';

import XButton from 'nonstate/atoms/XButton.js';

test('renders "Demographic Information" elem', () => {
  render(
   <XButton />
  );
  const elem = screen.getByText('✕');
  expect(elem).toBeInTheDocument();
});
