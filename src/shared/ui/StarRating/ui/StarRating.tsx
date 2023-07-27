import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '@/shared/ui/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

import classes from './StarRating.module.scss';
import { useState } from 'react';

interface StarRatingProps {
  className?: string;
  onSelect: (rating: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
  const { className, onSelect, selectedStars = 0, size = 30 } = props;
  const [currentRating, setCurrentRating] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (rating: number) => () => {
    if (isSelected) return;
    setCurrentRating(rating);
  };

  const onLeave = () => {
    if (isSelected) return;
    setCurrentRating(0);
  };

  const onClick = (rating: number) => () => {
    onSelect(rating);
    setCurrentRating(rating);
    setIsSelected(true);
  };

  return (
    <div className={classNames(classes.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          onClick={onClick(starNumber)}
          key={starNumber}
          Svg={StarIcon}
          className={classNames(
            classes.star,
            { [classes.hovered]: currentRating >= starNumber, [classes.selected]: isSelected },
            [],
          )}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
};
