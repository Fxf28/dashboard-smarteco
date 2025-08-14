import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { devices } from "@/db/schema";
import { eq } from "drizzle-orm";

// PATCH — update location
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { location } = await req.json();

  await db
    .update(devices)
    .set({ location })
    .where(eq(devices.id, Number(id)));

  return NextResponse.json({ message: "Updated" });
}

// DELETE — delete row
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  await db.delete(devices).where(eq(devices.id, Number(id)));

  return NextResponse.json({ message: "Deleted" });
}
