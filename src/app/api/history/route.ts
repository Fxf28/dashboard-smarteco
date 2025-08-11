import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  secure_url: string;
  // tambahkan properti lain kalau mau
}

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "esp32cam_uploads",
      max_results: 10,
    });

    const data = (result.resources as CloudinaryResource[]).map((img, index) => ({
      id: `${index + 1}`.padStart(3, "0"),
      status: "Tidak Penuh",
      lokasi: "Jakarta",
      urlGambar: img.secure_url,
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
