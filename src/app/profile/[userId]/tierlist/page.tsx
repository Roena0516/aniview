import type { NextPage } from 'next';
import { TierListGalleryPage } from './_features/ui/TierListGalleryPage';
import { mockTierLists } from './_entities/model/mockData';

interface TierListPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const TierListPage: NextPage<TierListPageProps> = async ({ params }) => {
  const { userId } = await params;

  // TODO: 실제로는 API에서 해당 userId의 티어리스트를 가져와야 함
  const userTierLists = mockTierLists.filter((list) => list.userId === userId);

  return <TierListGalleryPage userId={userId} tierLists={userTierLists} />;
};

export default TierListPage;
