import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Details from './index';
import { SummaryProps } from './summary';
import { View } from 'react-native';

describe('Details', () => {
  const mockOnPress = jest.fn();
  const mockOnChange = jest.fn();

  const summaryItems: SummaryProps[] = [
    {
      title: '标题1',
      value: '1',
      children: <View />,
    },
    {
      title: '标题2',
      value: '2',
      children: <View />,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('默认渲染 - 非受控模式', () => {
    const { getByText } = render(
      <Details items={summaryItems} />
    );

    expect(getByText('标题1')).toBeTruthy();
    expect(getByText('标题2')).toBeTruthy();
  });

  test('手风琴模式 - 单次展开', async () => {
    const { getByText, queryByText } = render(
      <Details accordion items={summaryItems} />
    );

    await fireEvent.press(getByText('标题1'));
    expect(getByText('标题1')).toBeTruthy();

    await fireEvent.press(getByText('标题2'));
    expect(queryByText('标题1')).toBeNull();
    expect(getByText('标题2')).toBeTruthy();
  });

  test('普通模式 - 多次展开', async () => {
    const { getByText } = render(
      <Details items={summaryItems} />
    );

    await fireEvent.press(getByText('标题1'));
    await fireEvent.press(getByText('标题2'));

    expect(getByText('标题1')).toBeTruthy();
    expect(getByText('标题2')).toBeTruthy();
  });

  test('受控模式 - value和onChange正常工作', async () => {
    const { getByText } = render(
      <Details
        items={summaryItems}
        value={['1']}
        onChange={mockOnChange}
      />
    );

    await fireEvent.press(getByText('标题1'));
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  test('自定义主题配置', () => {
    // 需要模拟useConfiguration的实现
    // 这里假设主题配置会影响样式
    const mockUseConfiguration = jest.fn().mockReturnValue({
      scheme: {
        components: {
          Details: {
            background: '#FF0000'
          },
        }
      }
    });

    // 由于useConfiguration在模块中直接使用，需要jest.mock来模拟
    jest.mock('../configuration', () => ({
      useConfiguration: mockUseConfiguration
    }));

    const { getByTestId } = render(
      <Details items={summaryItems} />
    );

    // 需要添加testID属性来测试样式
    // 这里展示测试主题配置是否被调用
    expect(mockUseConfiguration).toHaveBeenCalled();
  });
});
