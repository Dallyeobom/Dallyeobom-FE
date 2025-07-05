import { useAuthStore } from '@/stores/auth-store';

export default function withRankingGuard(WrappedComponent: React.FC) {
  return function RankingGuard() {
    const isLogin = useAuthStore((state) => state.isLoggedIn);

    // TODO: null대신 나중에401, 404페이지 만들기
    return isLogin ? <WrappedComponent /> : null;
  };
}
