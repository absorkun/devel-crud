import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-auto">
        <Button className="p-10"><Link href={'/users'} className="text-xl lg:text-4xl">SHOW TABEL USERS</Link></Button>
      </div>
    </div>
  )
}