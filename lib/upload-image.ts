import "server-only";
import fs from "fs/promises";
import path from "path";
import cuid from "cuid";

export async function saveBookImageToPublic(file: File): Promise<string> {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("Invalid file");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${cuid()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "book");
  const filePath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, buffer);

  return `/uploads/book/${fileName}`;
}
