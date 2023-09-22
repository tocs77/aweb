import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
  className?: string;
}
export const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
  const { className } = props;

  const clickHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Icon Svg={CircleIcon} width={32} height={32} clickable onClick={clickHandler} className={className} />;
};
