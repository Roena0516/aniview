import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { PhotoGalleryPage } from './_features/ui/PhotoGalleryPage';
import { createClient } from '../../../../../../shared/lib/supabase/server';

interface PhotoPageProps {
  params: Promise<{
    userId: string;
    tierlistId: string;
  }>;
}

const PhotoPage: NextPage<PhotoPageProps> = async ({ params }) => {
  const { tierlistId } = await params;
  const supabase = await createClient();

  const { data: tierlist, error } = await supabase
    .from('tierlists')
    .select('*')
    .eq('id', tierlistId)
    .single();

  if (error || !tierlist) {
    console.error('Error fetching tierlist:', error);
    notFound();
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', tierlist.user_id)
    .single();

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
    isPublic: tierlist.is_public ?? true,
  };

  return <PhotoGalleryPage tierList={tierListData} />;
};

export default PhotoPage;
