
import { render, fireEvent } from '@testing-library/react-native';
import Button from '.';

describe('Button', () => {
  it('是否正确渲染', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    const children = getByText('Test Button');
    expect(children).toBeTruthy();
  });

  it('外部传递并且正确应用样式', () => {
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

    const children = getByText('Test Button');
    expect(children).toBeTruthy();
    // Add more specific style assertions based on your component's styling
  });

  it('处理事件', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>Test Button</Button>
    );

    const buttonElement = getByText('Test Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('处理禁用状态', () => {
    const { getByText } = render(
      <Button disabled>Test Button</Button>
    );

    const buttonElement = getByText('Test Button');
    expect(buttonElement.props.disabled).toBe(true);
  });
});
