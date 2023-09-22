import { ScrollToTopButton } from '@/features/ScrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';

import classes from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = (props: ScrollToolbarProps) => {
  const { className } = props;
  return (
    <VStack justify='center' align='center' max className={classNames(classes.ScrollToolbar, {}, [className])} gap='16'>
      <ScrollToTopButton />
    </VStack>
  );
};
