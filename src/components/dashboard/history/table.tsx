"use client";

import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCaption, TableCell, TableFooter,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface HistoryItem {
    id: number;
    ip: string;
    mac: string;
    status: boolean;
    location: string | null;
    timestamp: string;
    cloudinary_url: string;
}

export function HistoryTable() {
    const [data, setData] = useState<HistoryItem[]>([]);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        setLoading(true);
        fetch("/api/history")
            .then((res) => {
                if (!res.ok) throw new Error("Gagal mengambil data");
                return res.json();
            })
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Hapus data ini?")) return;
        try {
            const res = await fetch(`/api/history/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Gagal menghapus data");
            fetchData();
        } catch (err) {
            alert(err);
        }
    };

    const handleEdit = (item: HistoryItem) => {
        const newLocation = prompt("Masukkan lokasi baru:", item.location || "");
        if (newLocation === null) return;

        fetch(`/api/history/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location: newLocation }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Gagal mengupdate data");
                fetchData();
            })
            .catch((err) => alert(err));
    };

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
                <TableCaption>A list of your recent device uploads.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]">ID</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>MAC</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead className="text-right">Gambar</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="font-medium">{row.id}</TableCell>
                            <TableCell>{row.ip}</TableCell>
                            <TableCell>{row.mac}</TableCell>
                            <TableCell>{row.status ? "Penuh" : "Tidak Penuh"}</TableCell>
                            <TableCell>{row.location || "-"}</TableCell>
                            <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                                <div
                                    className="w-10 h-10 overflow-hidden rounded-md inline-block cursor-pointer"
                                    onClick={() => setFullscreenImage(row.cloudinary_url)}
                                >
                                    <Image
                                        src={row.cloudinary_url || "/fallback.png"}
                                        alt={`Device ${row.id}`}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <button
                                    onClick={() => handleEdit(row)}
                                    className="text-blue-500 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(row.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>Total Rows</TableCell>
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
