import { NextPage } from 'next';
import { GalleryPage } from './_features/ui/GalleryPage';
import { createClient } from '../../shared/lib/supabase/server';
import type { TierListSummary } from './_entities/model/types';

const Gallery: NextPage = async () => {
  const supabase = await createClient();

  // 모든 티어리스트 조회 (최신순)
  const { data: tierlists, error } = await supabase
    .from('tierlists')
    .select(`
      *,
      profiles!tierlists_user_id_fkey (
        display_name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching tierlists:', error);
  }

  // 데이터 매핑
  const tierListSummaries: TierListSummary[] = (tierlists || []).map((tierlist) => {
    // tiers 배열에서 모든 애니메이션 개수 계산
    const animeCount = Array.isArray(tierlist.tiers)
      ? tierlist.tiers.reduce((sum: number, tier: Record<string, unknown>) => sum + ((tier.animes as unknown[] | undefined)?.length || 0), 0)
      : 0;

    return {
      id: tierlist.id,
      userId: tierlist.user_id,
      authorName: tierlist.profiles?.display_name || '알 수 없음',
      title: tierlist.title,
      description: tierlist.description || undefined,
      thumbnail: tierlist.thumbnail || '/placeholder-thumbnail.png',
      viewCount: tierlist.view_count,
      createdAt: new Date(tierlist.created_at),
      animeCount,
    };
  });

  return <GalleryPage tierlists={tierListSummaries} />;
};

export default Gallery;
