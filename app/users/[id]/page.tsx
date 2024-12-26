import MyLoading from "@/components/ui/myloading";
import prisma from "@/lib/db";

export default async function UserId({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Resolve params jika dianggap Promise
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return <MyLoading user={user} />
}