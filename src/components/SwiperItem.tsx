import React from 'react';
import { SwiperItemType } from '../types';

import './SwiperItem.css';

export type Props = SwiperItemType;

function SwiperItem({ imageSrc, imageAlt }: Props) {
  return (
    <li className="swiper-item">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="swiper-img"
        draggable={false}
      />
    </li>
  );
}

export default SwiperItem;
