import type { NextPage } from 'next';
import { TierListGalleryPage } from './_features/ui/TierListGalleryPage';
import { createClient } from '../../../../shared/lib/supabase/server';
import type { TierListSummary } from './_entities/model/types';

interface TierListPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const TierListPage: NextPage<TierListPageProps> = async ({ params }) => {
  const { userId } = await params;
  const supabase = await createClient();

  // 티어리스트 목록 조회
  let tierListSummaries: TierListSummary[] = [];

  try {
    const { data: tierlists, error } = await supabase
      .from('tierlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tierlists:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    } else if (tierlists) {
      console.log('Fetched tierlists:', tierlists.length);
      tierListSummaries = tierlists.map((tierlist) => ({
        id: tierlist.id,
        userId: tierlist.user_id,
        authorName: 'Unknown', // Will be fetched from profile in real implementation
        title: tierlist.title,
        description: tierlist.description,
        thumbnail: tierlist.thumbnail || '/placeholder-thumbnail.png',
        viewCount: tierlist.view_count,
        createdAt: new Date(tierlist.created_at),
        updatedAt: new Date(tierlist.updated_at),
        animeCount: 0, // Will be calculated from tiers in real implementation
      }));
    }
  } catch (error) {
    console.error('Database error:', error);
  }

  return <TierListGalleryPage userId={userId} tierLists={tierListSummaries} />;
};

export default TierListPage;
