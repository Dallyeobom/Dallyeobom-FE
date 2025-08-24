import { SvgProps } from 'react-native-svg';

import HomeFillIconSvg from '@/assets/icons/tab/home-fill.svg';
import HomeIconSvg from '@/assets/icons/tab/home.svg';
import ProfileFillIconSvg from '@/assets/icons/tab/profile-fill.svg';
import ProfileIconSvg from '@/assets/icons/tab/profile.svg';
import RankingFillIconSvg from '@/assets/icons/tab/ranking-fill.svg';
import RankingIconSvg from '@/assets/icons/tab/ranking.svg';
import SearchFillIconSvg from '@/assets/icons/tab/search-fill.svg';
import SearchIconSvg from '@/assets/icons/tab/search.svg';

export interface TabIconProps extends SvgProps {
  focused?: boolean;
}

export const HomeIcon = HomeIconSvg;
export const HomeFillIcon = HomeFillIconSvg;
export const RankingIcon = RankingIconSvg;
export const RankingFillIcon = RankingFillIconSvg;
export const SearchIcon = SearchIconSvg;
export const SearchFillIcon = SearchFillIconSvg;
export const ProfileIcon = ProfileIconSvg;
export const ProfileFillIcon = ProfileFillIconSvg;
