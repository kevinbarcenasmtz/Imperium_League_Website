import EditTeamForm from "./EditTeamForm";

interface Props {
  params: {
    teamId: string;
  };
}

export default function EditTeamPage({ params }: Props) {
  return <EditTeamForm teamId={params.teamId} />;
}