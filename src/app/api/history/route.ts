import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // adjust path if needed
import { devices } from "@/db/schema"; // your drizzle schema file
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch the latest 10 entries from the devices table
    const result = await db
      .select({
        id: devices.id,
        ip: devices.ip,
        mac: devices.mac,
        status: devices.status,
        location: devices.location,
        timestamp: devices.timestamp,
        cloudinary_url: devices.cloudinaryUrl,
      })
      .from(devices)
      .orderBy(desc(devices.timestamp))
      .limit(10);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch device history" }, { status: 500 });
  }
}
