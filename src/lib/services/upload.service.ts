import { randomBytes } from "crypto";
import { UploadEntity } from "../types/photo";
import { promises as fs } from "fs";
import { createWriteStream } from "fs";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { promisify } from "util";
import { exec } from "child_process";
import { generatePreview } from "./video-preview.service";

export class UploadService {
  private webToNodeStream(webStream: ReadableStream<Uint8Array>) {
    const reader = webStream.getReader();
    return new Readable({
      async read() {
        const { done, value } = await reader.read();
        if (done) this.push(null);
        else this.push(Buffer.from(value));
      },
    });
  }
  private async ensureDirExists(entity: UploadEntity): Promise<string> {
    const dirPath = path.join(process.cwd(), "public", "uploads", entity);
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return dirPath;
    } catch (error) {
      console.error("Error creating directory:", error);
      throw new Error("Failed to create upload directory");
    }
  }
  private generateShortId(length = 7): string {
    return randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  }

  public async upload(file: File, entity: UploadEntity) {
    await this.ensureDirExists(entity);

    const shortId = this.generateShortId();
    const fileName = `${shortId}.${file.name
      .split(".")
      .findLast((x) => x)}`.trim();
    const filePath = `./public/uploads/${entity}/${fileName}`;

    // Convert Web Stream to Node.js Stream
    const webStream = file.stream();
    const nodeReadable = this.webToNodeStream(webStream);
    const nodeWritable = createWriteStream(filePath);

    console.log("stage 0: started to upload photo. filepath: ", filePath);
    await pipeline(nodeReadable, nodeWritable);

    return {
      fileName: fileName,
      filePath: `/uploads/${entity.trim()}/${fileName.trim()}`.trim(),
      shortId: shortId,
    };
  }

  public async uploadVideo(file: File, shortId: string) {
    const extension = file.name.split(".").pop();
    const fileName = `${shortId.trim()}.${extension}`.trim();
    const filePath = path.join("videos", fileName);
    const absolutePath = path.join(process.cwd(), filePath);

    // Convert Web Stream to Node.js Stream
    const webStream = file.stream();
    const nodeReadable = this.webToNodeStream(webStream);
    const nodeWritable = createWriteStream(filePath);

    // Upload video
    console.log("stage 1: uploading video. shortId: ", shortId);
    await pipeline(nodeReadable, nodeWritable);

    // Generate preview
    const previewFileName = `${shortId.trim()}-preview.mp4`.trim();
    const previewFilePath = path.join("videos", previewFileName);
    const absolutePreviewPath = path.join(process.cwd(), previewFilePath);

    try {
      const ffmpegCheck = await promisify(exec)("ffmpeg -version");
      console.log("ffmpeg check result is: ", ffmpegCheck);
      if (ffmpegCheck.stderr) {
        console.log("FFmpeg not installed");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("stage 2: generating preview");
    await generatePreview(absolutePath, absolutePreviewPath);

    return {
      fileName: fileName,
      filePath: filePath,
      shortId: shortId,
    };
  }
}
