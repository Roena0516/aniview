import { NextPage } from 'next';
import { CreatePageView } from './_features/ui/CreatePageView';

interface CreatePageProps {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{
    edit?: string;
  }>;
}

const CreatePage: NextPage<CreatePageProps> = async ({ params, searchParams }) => {
  const { userId } = await params;
  const { edit } = await searchParams;

  return <CreatePageView userId={userId} editId={edit} />;
};

export default CreatePage;
