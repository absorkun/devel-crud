"use client";

import { updateUser } from "@/actions/userAction";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { User } from "@prisma/client";


export default function MyLoading({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(true);

  // Mengatur loading hanya sekali saat user valid
  useEffect(() => {
    if (user?.id) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-5 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-12">
      <h1 className="text-4xl font-extrabold mb-10 underline">UPDATE DATA</h1>
      <form action={updateUser}>
        <div className="space-y-4">
          <Input type="hidden" name="id" defaultValue={user?.id.toString()} />
          <Label>
            <span>Email</span>
            <Input type="email" name="email" defaultValue={user?.email || ""} />
          </Label>
          <Label>
            <span>Name</span>
            <Input type="text" name="name" defaultValue={user?.name || ""} />
          </Label>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
