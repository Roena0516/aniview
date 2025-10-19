import { NextPage } from 'next';
import { TierListViewPage } from './_features/ui/TierListViewPage';
import { mockTierListData } from './_entities/model/mockTierList';

interface TierListPageProps {
  params: Promise<{
    userId: string;
    tierlistId: string;
  }>;
}

const TierListPage: NextPage<TierListPageProps> = async ({ params }) => {
  const { userId, tierlistId } = await params;

  // TODO: 실제로는 API에서 tierlistId로 데이터를 가져와야 함
  const tierListData = {
    ...mockTierListData,
    id: tierlistId,
    userId: userId,
  };

  return <TierListViewPage tierList={tierListData} />;
};

export default TierListPage;
