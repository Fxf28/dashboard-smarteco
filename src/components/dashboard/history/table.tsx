"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const data = [
    {
        id: "001",
        status: "Tidak Penuh",
        lokasi: "Jakarta",
        urlGambar: "/fallback.png",
    },
    {
        id: "002",
        status: "Penuh",
        lokasi: "Bandung",
        urlGambar: "/fallback.png",
    },
];

export function HistoryTable() {
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    return (
        <>
            <Table>
                <TableCaption>A list of your recent history.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead className="text-right">Gambar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="font-medium">{row.id}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.lokasi}</TableCell>
                            <TableCell className="text-right">
                                <div
                                    className="w-10 h-10 overflow-hidden rounded-md inline-block cursor-pointer"
                                    onClick={() => setFullscreenImage(row.urlGambar)}
                                >
                                    <Image
                                        src={row.urlGambar}
                                        alt={row.id}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Rows</TableCell>
                        <TableCell className="text-right">{data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            {/* Fullscreen modal */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setFullscreenImage(null)}
                >
                    <Image
                        src={fullscreenImage}
                        alt="Fullscreen"
                        width={800}
                        height={800}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </>
    );
}
