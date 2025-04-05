import ffmpeg from "fluent-ffmpeg";

// Add these interfaces
type VideoPreviewResult = {
  originalPath: string;
  previewPath: string;
  duration: number;
};

// Add to VideoUploadService class
export async function generatePreview(
    inputPath: string,
    outputPath: string
  ): Promise<VideoPreviewResult> {
    if(process.env.NODE_ENV === "development"){
      ffmpeg.setFfmpegPath('D:\\FFmpeg\\bin\\ffmpeg.exe');
    }
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .output(outputPath)
        .duration(10)
        .on('end', () => {
          resolve({
            originalPath: inputPath,
            previewPath: outputPath,
            duration: 10
          });
        })
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(new Error('Preview generation failed'));
        })
        .run();
    });
  }
