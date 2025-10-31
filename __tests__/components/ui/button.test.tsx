import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render with provided content', () => {
    render(
      <Button
        content="Click me"
        className="btn-primary"
        type="button"
        onclick={mockOnClick}
      />
    );

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should apply provided className', () => {
    render(
      <Button
        content="Test Button"
        className="custom-class another-class"
        type="button"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveClass('custom-class', 'another-class');
  });

  it('should call onclick when clicked', () => {
    render(
      <Button
        content="Click me"
        className="btn-primary"
        type="button"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct button type', () => {
    render(
      <Button
        content="Submit"
        className="btn-submit"
        type="submit"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should handle reset type', () => {
    render(
      <Button
        content="Reset"
        className="btn-reset"
        type="reset"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Reset' });
    expect(button).toHaveAttribute('type', 'reset');
  });

  it('should handle button type', () => {
    render(
      <Button
        content="Button"
        className="btn-default"
        type="button"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should handle multiple clicks', () => {
    render(
      <Button
        content="Click me"
        className="btn-primary"
        type="button"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Click me' });
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(3);
  });

  it('should handle empty content', () => {
    render(
      <Button
        content=""
        className="btn-empty"
        type="button"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  it('should handle empty className', () => {
    render(
      <Button
        content="Test"
        className=""
        type="button"
        onclick={mockOnClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toBeInTheDocument();
  });
});
