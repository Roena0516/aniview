import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { TierListViewPage } from './_features/ui/TierListViewPage';
import { createClient } from '../../../../../shared/lib/supabase/server';

interface TierListPageProps {
  params: Promise<{
    userId: string;
    tierlistId: string;
  }>;
}

const TierListPage: NextPage<TierListPageProps> = async ({ params }) => {
  const { userId, tierlistId } = await params;
  const supabase = await createClient();

  // Supabase에서 티어표 데이터 가져오기
  const { data: tierlist, error } = await supabase
    .from('tierlists')
    .select('*')
    .eq('id', tierlistId)
    .single();

  if (error || !tierlist) {
    console.error('Error fetching tierlist:', error);
    notFound();
  }

  // 작성자 프로필 정보 가져오기
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', tierlist.user_id)
    .single();

  // 조회수 증가
  await supabase.rpc('increment_view_count', { tierlist_id: tierlistId });

  const tierListData = {
    id: tierlist.id,
    userId: tierlist.user_id,
    authorName: profile?.display_name || '알 수 없음',
    title: tierlist.title,
    description: tierlist.description,
    tiers: tierlist.tiers,
    viewCount: tierlist.view_count,
    createdAt: new Date(tierlist.created_at),
    updatedAt: new Date(tierlist.updated_at),
  };

  return <TierListViewPage tierList={tierListData} />;
};

export default TierListPage;
