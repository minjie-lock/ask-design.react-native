import { render, screen } from '@testing-library/react-native';
import Avatar from '.';

describe('Avatar', () => {
  const mockAvatarScheme = {
    round: 8,
    background: '#F0F0F0',
  };

  // 设置全局的 mock configuration
  const originalEnv = process.env;
  beforeEach(() => {
    // 创建一个 mock 的 configuration
    (useConfiguration as jest.Mock).mockImplementation((selector) => {
      return selector({
        scheme: {
          components: {
            Avatar: mockAvatarScheme,
          },
        },
      });
    });
  });

  it('应该正确渲染文字头像', () => {
    render(<Avatar size="middle" color="#FF0000">A</Avatar>);

    // 检查容器样式
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveStyle({
      width: 48,
      height: 48,
      borderRadius: 8,
    });

    // 检查文字显示
    const textElement = screen.getByText('A');
    expect(textElement).toBeDefined();
    expect(textElement).toHaveStyle({
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    });
  });

  it('应该正确渲染图片头像', () => {
    const imageUrl = 'https://example.com/avatar.jpg';
    render(<Avatar size="large" src={imageUrl} />);

    // 检查容器样式
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveStyle({
      width: 64,
      height: 64,
      borderRadius: '50%',
    });

    // 检查图片显示
    const imageElement = screen.getByTestId('avatar-image');
    expect(imageElement).toBeDefined();
    expect(imageElement.props.source).toEqual({ uri: imageUrl });
  });

  it('应该在图片加载失败时显示 fallback', () => {
    // 模拟图片加载错误
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const imageUrl = 'https://example.com/broken-image.jpg';
    render(<Avatar size="small" src={imageUrl} />);

    // 检查 fallback 显示
    const fallbackElement = screen.getByTestId('avatar-fallback');
    expect(fallbackElement).toBeDefined();

    // 检查是否有错误图标
    const iconElement = screen.getByTestId('avatar-icon');
    expect(iconElement).toBeDefined();
  });

  it('应该使用默认的 fallback 当没有提供时', () => {
    // 模拟图片加载错误
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const imageUrl = 'https://example.com/broken-image.jpg';
    render(<Avatar size="mini" src={imageUrl} />);

    // 检查默认的 fallback 图标
    const iconElement = screen.getByTestId('avatar-icon');
    expect(iconElement).toBeDefined();
    expect(iconElement.props.name).toBe('user');
    expect(iconElement.props.size).toBe('lg');
  });

  it('应该根据 shape 属性改变形状', () => {
    render(<Avatar size="middle" shape="circle" src="https://example.com/avatar.jpg" />);

    // 检查圆形样式
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveStyle({
      borderRadius: '50%',
    });
  });
});
