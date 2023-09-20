import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

import classes from './StarRating.module.scss';
import { useEffect, useState } from 'react';
import { toggleFeatures } from '@/shared/lib/features';

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

  useEffect(() => {
    if (selectedStars) setIsSelected(true);
    setCurrentRating(selectedStars);
  }, [selectedStars]);

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

  const makeIcon = (starNumber: number) =>
    toggleFeatures({
      name: 'isAppRedesigned',
      on: () => (
        <Icon
          clickable={!isSelected}
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
          data-testid='RatingStar'
          data-rating={currentRating >= starNumber ? 'rating-selected' : ''}
        />
      ),
      off: () => (
        <IconDeprecated
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
          data-testid='RatingStar'
          data-rating={currentRating >= starNumber ? 'rating-selected' : ''}
        />
      ),
    });

  return (
    <div
      className={classNames(
        toggleFeatures({ name: 'isAppRedesigned', on: () => classes.StarRatingRedesigned, off: () => classes.StarRating }),
        {},
        [className],
      )}>
      {stars.map((starNumber) => makeIcon(starNumber))}
    </div>
  );
};
