export default function withRankingGuard<P>(WrappedComponent: React.FC<P>) {
  return function RankingGuard(props: React.PropsWithChildren<P>) {
    console.log('PROPS', props);
    return <WrappedComponent {...props} />;
  };
}
