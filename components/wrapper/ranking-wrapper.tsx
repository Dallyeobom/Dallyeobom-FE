import { useAuthStore } from '@/stores/auth-store';

export default function withRankingGuard(WrappedComponent: React.FC) {
  return function RankingGuard() {
    const isLogin = useAuthStore((state) => state.isLoggedIn);
    return isLogin ? <WrappedComponent /> : null;
  };
}
