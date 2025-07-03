interface RankingWrapperProps {}

export default function withRankingGuard(WrappedComponent: any) {
  return function RankingGuard(props: any) {
    // 로오딩이나 보여주자..
    // 데이터
    return (
      <>
        <WrappedComponent />
      </>
    );
  };
}
