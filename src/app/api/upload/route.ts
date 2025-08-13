// app/api/upload/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { img } = await req.json();
    if (!img || typeof img !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Strip "data:image/...;base64," prefix if present
    const base64Data = img.includes(",") ? img.split(",")[1] : img;
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Optional: file type check via magic bytes
    if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50) {
      console.log("PNG detected");
    } else if (imageBuffer[0] === 0xff && imageBuffer[1] === 0xd8) {
      console.log("JPEG detected");
    } else {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: "esp32cam_uploads", resource_type: "image" }, (error: UploadApiErrorResponse | undefined, uploadResult: UploadApiResponse | undefined) => {
        if (error) reject(error);
        else if (uploadResult) resolve(uploadResult);
        else reject(new Error("Unknown upload error"));
      });
      uploadStream.end(imageBuffer);
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
