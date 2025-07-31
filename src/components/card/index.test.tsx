import { render, fireEvent } from '@testing-library/react-native';
import Card from '.';

describe('Card', () => {
  it('渲染', () => {
    const { getByText } = render(<Card>Card</Card>);
    const children = getByText('Card');
    expect(children).toBeTruthy();
  });

  it('传参', () => {

  });
});
