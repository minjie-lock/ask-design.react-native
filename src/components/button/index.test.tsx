import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './index';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    const buttonElement = getByText('Test Button');
    expect(buttonElement).toBeTruthy();
  });

  it('applies correct styles when props are provided', () => {
    const { getByText } = render(
      <Button
        size="large"
        block
        shape="rounded"
        color="primary"
        fill="solid"
      >
        Test Button
      </Button>
    );

    const buttonElement = getByText('Test Button');
    expect(buttonElement).toBeTruthy();
    // Add more specific style assertions based on your component's styling
  });

  it('handles press event correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>Test Button</Button>
    );

    const buttonElement = getByText('Test Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    const { getByText } = render(
      <Button disabled>Test Button</Button>
    );

    const buttonElement = getByText('Test Button');
    expect(buttonElement.props.disabled).toBe(true);
  });
});
