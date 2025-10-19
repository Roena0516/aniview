import { NextPage } from 'next';
import { CreatePageView } from './_features/ui/CreatePageView';

interface CreatePageProps {
  params: Promise<{
    userId: string;
  }>;
}

const CreatePage: NextPage<CreatePageProps> = async ({ params }) => {
  const { userId } = await params;
  return <CreatePageView userId={userId} />;
};

export default CreatePage;
