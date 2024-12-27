import TeamRegistrationForm from '@/components/TeamRegistrationForm';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function CreateTeamPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container mx-auto py-8">
      <TeamRegistrationForm />
    </div>
  );
}