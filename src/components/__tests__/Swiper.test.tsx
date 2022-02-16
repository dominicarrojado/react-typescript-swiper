import { fireEvent, render, screen } from '@testing-library/react';
import faker from 'faker';
import { setReadOnlyProperty } from '../../lib/test-helpers';
import Swiper, { Props } from '../Swiper';

describe('<Swiper />', () => {
  const renderComponent = (props: Props) => render(<Swiper {...props} />);
  const createRandomItems = (count = 3) => {
    const items = [];

    for (let i = 0; i < count; i++) {
      items.push({
        imageSrc: faker.image.imageUrl(),
        imageAlt: faker.lorem.sentence(),
      });
    }

    return items;
  };

  it('should display the images', () => {
    const items = createRandomItems();

    renderComponent({ items });

    items.forEach((item) => {
      const imageEl = screen.queryByAltText(item.imageAlt) as HTMLImageElement;

      expect(imageEl).toHaveAttribute('src', item.imageSrc);
    });
  });

  it('should swipe items on mouse move', () => {
    const items = createRandomItems();

    renderComponent({ items });

    const containerWidth = faker.datatype.number({ min: 1 });
    const containerScrollWidth = containerWidth * items.length;

    const listEl = screen.queryAllByRole('list')[0];

    // override list element's read-only properties
    setReadOnlyProperty(listEl, 'offsetWidth', containerWidth);
    setReadOnlyProperty(listEl, 'scrollWidth', containerScrollWidth);

    // verify start position is 0
    expect(listEl).toHaveStyle({
      transform: 'translate3d(0px, 0, 0)',
    });

    // verify should move to the left
    let startX = 0;

    // in order the move from right to left
    // difference in "x" value must be negative
    // and more than 40
    let endX = -41;

    fireEvent.mouseDown(listEl, { clientX: startX });
    fireEvent.mouseMove(listEl, { clientX: endX });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(${-containerWidth}px, 0, 0)`,
    });

    // verify should move to the right
    startX = 0;
    endX = 41;

    fireEvent.mouseDown(listEl, { clientX: startX });
    fireEvent.mouseMove(listEl, { clientX: endX });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0px, 0, 0)`,
    });

    // verify should stay in position if less than minimum move
    startX = 0;
    endX = faker.datatype.number({ min: 0, max: 40 });

    fireEvent.mouseDown(listEl, { clientX: startX });
    fireEvent.mouseMove(listEl, { clientX: endX });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0px, 0, 0)`,
    });

    // verify shouldn't move further right if already at the start
    startX = 0;
    endX = 1;

    fireEvent.mouseDown(listEl, { clientX: startX });
    fireEvent.mouseMove(listEl, { clientX: endX });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0px, 0, 0)`,
    });

    // verify shouldn't move further left if already at the end
    const minOffsetX = containerScrollWidth - containerWidth;

    startX = 0;
    endX = -(minOffsetX + 1);

    fireEvent.mouseDown(listEl, { clientX: startX });
    fireEvent.mouseMove(listEl, { clientX: endX });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(${-minOffsetX}px, 0, 0)`,
    });
  });

  it('should swipe items on touch move', () => {
    const items = createRandomItems();

    renderComponent({ items });

    const containerWidth = faker.datatype.number({ min: 1 });
    const containerScrollWidth = containerWidth * items.length;

    const listEl = screen.queryAllByRole('list')[0];

    // override list element's read-only properties
    setReadOnlyProperty(listEl, 'offsetWidth', containerWidth);
    setReadOnlyProperty(listEl, 'scrollWidth', containerScrollWidth);

    // verify start position is 0
    expect(listEl).toHaveStyle({
      transform: 'translate3d(0px, 0, 0)',
    });

    // verify should move to the left
    let startX = 0;
    let endX = -41;

    fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] });
    fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] });
    fireEvent.touchEnd(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(${-containerWidth}px, 0, 0)`,
    });

    // verify should move to the right
    startX = 0;
    endX = 41;

    fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] });
    fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] });
    fireEvent.touchEnd(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0px, 0, 0)`,
    });

    // verify should stay in position if less than minimum move
    startX = 0;
    endX = -faker.datatype.number({ min: 0, max: 40 });

    fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] });
    fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] });
    fireEvent.touchEnd(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0px, 0, 0)`,
    });

    // verify shouldn't move further right if already at the start
    startX = 0;
    endX = 1;

    fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] });
    fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] });
    fireEvent.touchEnd(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0px, 0, 0)`,
    });

    // verify shouldn't move further left if already at the end
    const minOffsetX = containerScrollWidth - containerWidth;

    startX = 0;
    endX = -(minOffsetX + 1);

    fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] });
    fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] });
    fireEvent.touchEnd(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(${-minOffsetX}px, 0, 0)`,
    });
  });

  it('should swipe items on indicator click', () => {
    const items = createRandomItems();

    renderComponent({ items });

    const containerWidth = faker.datatype.number({ min: 1 });
    const containerScrollWidth = containerWidth * items.length;

    const listEl = screen.queryAllByRole('list')[0];

    // override list element's read-only properties
    setReadOnlyProperty(listEl, 'offsetWidth', containerWidth);
    setReadOnlyProperty(listEl, 'scrollWidth', containerScrollWidth);

    // verify start position is 0
    expect(listEl).toHaveStyle({
      transform: 'translate3d(0px, 0, 0)',
    });

    const firstIndicatorEl = screen.queryAllByTestId('indicator')[0];

    // verify first indicator item has an "active" class
    expect(firstIndicatorEl).toHaveClass('active');

    const secondIndicatorEl = screen.queryAllByTestId('indicator')[1];

    expect(secondIndicatorEl).not.toHaveClass('active');

    fireEvent.click(secondIndicatorEl);

    // verify second indicator item has an "active" class
    expect(secondIndicatorEl).toHaveClass('active');
    expect(firstIndicatorEl).not.toHaveClass('active');

    // verify should move to the left
    expect(listEl).toHaveStyle({
      transform: `translate3d(${-containerWidth}px, 0, 0)`,
    });
  });
});
