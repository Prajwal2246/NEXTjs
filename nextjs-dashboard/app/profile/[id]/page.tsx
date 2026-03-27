export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>Profile {id}</p>
    </div>
  );
}
