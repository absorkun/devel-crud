import { createUser, deleteUser } from "@/actions/userAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader } from "@/components/ui/table";
import prisma from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";
import Refresh from "./refresh";

export default function UsersPage() {
    return (
        <div className="p-5 space-y-12">
            <h1 className="text-4xl font-extrabold mb-10 underline">DATA</h1>
            <FormUsers />
            <Suspense fallback={<TableSkeleton />}>
                <TableUsers />
            </Suspense>
            <Refresh />
        </div>
    )
}

function FormUsers() {
    return (
        <form action={createUser}>
            <div className="space-y-4">
                <Label>
                    <span>Email</span>
                    <Input type="email" name="email" />
                </Label>
                <Label>
                    <span>Name</span>
                    <Input type="text" name="name" />
                </Label>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    )
}

function TableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <tr>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                </tr>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                        <TableCell>
                            <Skeleton className="h-4 w-[250px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-4">
                                <Skeleton className="h-10 w-[60px]" />
                                <Skeleton className="h-10 w-[80px]" />
                            </div>
                        </TableCell>
                    </tr>
                ))}
            </TableBody>
        </Table>
    );
}

async function TableUsers() {
    const users = await prisma.user.findMany();
    return (
        <Table>
            <TableHeader>
                <tr>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                </tr>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                            <div className="flex space-x-4">
                                <Button variant="link"><Link href={`/users/${user.id}`}>Edit</Link></Button>
                                <div className="">
                                    <form action={deleteUser}>
                                        <Input type="hidden" name="id" value={user.id} />
                                        <Button type="submit" variant="destructive">Delete</Button>
                                    </form>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                ))}
            </TableBody>
        </Table>
    )
}