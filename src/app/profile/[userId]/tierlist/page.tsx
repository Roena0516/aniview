import type { NextPage } from 'next';
import { TierListGalleryPage } from './_features/ui/TierListGalleryPage';
import { createClient } from '../../../../shared/lib/supabase/server';

interface TierListPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const TierListPage: NextPage<TierListPageProps> = async ({ params }) => {
  const { userId } = await params;
  const supabase = await createClient();

  const { data: tierlists, error } = await supabase
    .from('tierlists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tierlists:', error);
  }

  const tierListSummaries = (tierlists || []).map((tierlist) => ({
    id: tierlist.id,
    userId: tierlist.user_id,
    title: tierlist.title,
    description: tierlist.description,
    thumbnail: tierlist.thumbnail,
    viewCount: tierlist.view_count,
    createdAt: new Date(tierlist.created_at),
    updatedAt: new Date(tierlist.updated_at),
  }));

  return <TierListGalleryPage userId={userId} tierLists={tierListSummaries} />;
};

export default TierListPage;
