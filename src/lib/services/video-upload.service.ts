import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { generatePreview } from "./video-preview.service";
import { promisify } from "util";
import { exec } from "child_process";

type UploadResult = {
  success: boolean;
  data?: {
    filePath: string;
    fileName: string;
  };
  error?: {
    message: string;
    code: string;
  };
};

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];

export class VideoUploadService {
  private generateShortId(length = 7): string {
    const dateStr = Date.now().toString(36); // convert num to base 36 and stringify
    const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point
    return `${randomStr}`;
  }

  private async ensureDirExists(): Promise<void> {
    const dirPath = path.join(process.cwd(), "videos");
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
      throw new Error("Failed to create videos directory");
    }
  }

  public async uploadVideo(file: File): Promise<UploadResult> {
    try {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return {
          success: false,
          error: { message: "Invalid video format", code: "INVALID_FILE_TYPE" },
        };
      }

      if (file.size > MAX_FILE_SIZE) {
        return {
          success: false,
          error: {
            message: "File too large (max 500MB)",
            code: "FILE_TOO_LARGE",
          },
        };
      }

      await this.ensureDirExists();

      const extension = file.name.split(".").pop();
      const fileName = `${this.generateShortId()}.${extension}`;
      const filePath = path.join("videos", fileName);
      const absolutePath = path.join(process.cwd(), filePath);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(absolutePath, buffer);

      // Generate preview
      const previewFileName = `${fileName.split('.')[0]}-preview.mp4`;
      const previewFilePath = path.join("videos", previewFileName);
      const absolutePreviewPath = path.join(process.cwd(), previewFilePath);

      console.log("now its time to generate preview here...");
      const ffmpegCheck = await promisify(exec)("ffmpeg -version");
      if (ffmpegCheck.stderr) {
        console.log("FFmpeg not installed");
      }
      await generatePreview(
        absolutePath,
        absolutePreviewPath
      );

      return {
        success: true,
        data: {
          filePath: `${fileName}`,
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
