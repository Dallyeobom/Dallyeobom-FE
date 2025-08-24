import type { SvgProps } from 'react-native-svg';

import CloseSvg from '@/assets/icons/common/close.svg';
import HeartFillSvg from '@/assets/icons/common/heart-fill.svg';
import HeartSvg from '@/assets/icons/common/heart.svg';
import KakaoSymbolSvg from '@/assets/icons/common/kakao-symbol.svg';

export const CloseIcon = CloseSvg;
export const HeartIcon = HeartSvg;
export const HeartFillIcon = HeartFillSvg;
export const KakaoSymbolIcon = KakaoSymbolSvg;

export interface CommonIconProps extends SvgProps {}