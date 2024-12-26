"use client";

import { Button } from "@/components/ui/button";

export default function Refresh() {
    return (
        <div className="flex justify-center items-center">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => location.reload()}>Refresh</Button>
        </div>
    )
}