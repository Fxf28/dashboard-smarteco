// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Konfigurasi Cloudinary dari environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Konversi File ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload ke Cloudinary dari buffer
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "esp32cam_uploads",
          resource_type: "auto", // bisa image/video/pdf
        },
        (error?: UploadApiErrorResponse, uploadResult?: UploadApiResponse) => {
          if (error) {
            reject(error);
          } else if (uploadResult) {
            resolve(uploadResult);
          } else {
            reject(new Error("Unknown upload error"));
          }
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({
      message: "Upload success",
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
