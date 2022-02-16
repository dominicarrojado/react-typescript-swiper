import { render } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  const renderComponent = () => render(<App />);

  it('should render without errors', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
  });
});
