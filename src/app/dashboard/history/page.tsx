import { HistoryTable } from "@/components/dashboard/history/table";

// app/dashboard/history/page.tsx
export default function HistoryPage() {
    return (
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-4">History</h1>
            <p className="text-muted-foreground mb-6">
                View your recent history.
            </p>
            <div className="overflow-x-auto">
                <HistoryTable />
            </div>
        </div>
    )
}
