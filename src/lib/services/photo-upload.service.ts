import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { UploadEntity, UploadResult } from "@/lib/types/photo";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export class PhotoUploadService {
  private generateShortId(length = 7): string {
    return randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  }

  private async ensureDirExists(entity: UploadEntity): Promise<void> {
    const dirPath = path.join(process.cwd(), "public", "uploads", entity);
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
      throw new Error("Failed to create upload directory");
    }
  }

  public async uploadFile(
    entity: UploadEntity,
    file: File
  ): Promise<UploadResult> {
    try {
      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return {
          success: false,
          error: { message: "Invalid file type", code: "INVALID_FILE_TYPE" },
        };
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return {
          success: false,
          error: {
            message: "File too large (max 5MB)",
            code: "FILE_TOO_LARGE",
          },
        };
      }

      // Create directory if needed
      await this.ensureDirExists(entity);

      // Generate filename
      const extension = file.name.split(".").pop();
      // Generate file path with forward slashes
      const fileName = `${entity}_${this.generateShortId()}.${extension}`;
      const filePath = `uploads/${entity}/${fileName}`; // Use forward slashes
      const absolutePath = path.join(
        process.cwd(),
        "public",
        ...filePath.split("/") // Convert to OS path
      );

      // Convert File to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Write file
      await fs.writeFile(absolutePath, buffer);

      return {
        success: true,
        data: {
          filePath: `/${filePath}`,
          fileName,
        },
      };
    } catch (error) {
      console.error("Upload error:", error);
      return {
        success: false,
        error: { message: "Internal server error", code: "INTERNAL_ERROR" },
      };
    }
  }
}
