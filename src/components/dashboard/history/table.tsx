"use client";

import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCaption, TableCell, TableFooter,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface HistoryItem {
    id: string;
    status: string;
    lokasi: string;
    urlGambar: string;
}

export function HistoryTable() {
    const [data, setData] = useState<HistoryItem[]>([]);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch("/api/history")
            .then((res) => {
                if (!res.ok) throw new Error("Gagal mengambil data");
                return res.json();
            })
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-transparent"></span>
                <span className="ml-3">Memuat data...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Gagal memuat data: {error}
            </div>
        );
    }

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
                                        src={row.urlGambar || "/fallback.png"}
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
