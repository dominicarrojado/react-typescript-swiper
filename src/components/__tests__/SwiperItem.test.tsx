import { render, screen } from '@testing-library/react';
import faker from 'faker';
import SwiperItem, { Props } from '../SwiperItem';

describe('<SwiperItem />', () => {
  const renderComponent = (props: Props) => render(<SwiperItem {...props} />);

  it('should accept imageSrc and imageAlt props', () => {
    const imageSrc = faker.image.imageUrl();
    const imageAlt = faker.lorem.sentence();

    renderComponent({ imageSrc, imageAlt });

    const imageEl = screen.queryByAltText(imageAlt);

    expect(imageEl).toHaveAttribute('src', imageSrc);
  });
});
