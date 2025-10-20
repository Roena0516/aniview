import { NextPage } from 'next';
import { SettingsPageView } from './_features/ui/SettingsPageView';

interface SettingsPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const SettingsPage: NextPage<SettingsPageProps> = async ({ params }) => {
  const { userId } = await params;

  return <SettingsPageView userId={userId} />;
};

export default SettingsPage;
