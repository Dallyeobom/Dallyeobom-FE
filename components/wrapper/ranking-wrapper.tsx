export default function withRankingGuard<P>(WrappedComponent: React.FC<P>) {
  return function RankingGuard(props: React.PropsWithChildren<P>) {
    // TODO: 후에 로딩스피너..?
    return <WrappedComponent {...props} />;
  };
}
