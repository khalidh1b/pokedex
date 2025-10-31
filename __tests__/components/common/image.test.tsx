import { render, screen, fireEvent } from '@testing-library/react';
import { Image } from '@/components/common/image';

describe('Image', () => {
  it('should render a loading state initially', () => {
    render(<Image src="test.jpg" alt="test" />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('should render the image when it has loaded', () => {
    render(<Image src="test.jpg" alt="test" />);
    const image = screen.getByRole('img', { hidden: true });
    fireEvent.load(image);
    expect(image).not.toHaveClass('opacity-0');
  });

  it('should render an error message if the image fails to load', () => {
    render(<Image src="test.jpg" alt="test" />);
    const image = screen.getByRole('img', { hidden: true });
    fireEvent.error(image);
    expect(screen.getByText('Image not available')).toBeInTheDocument();
  });
});
