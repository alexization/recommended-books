import {ValidationError} from "./AppError";
import {ErrorMessage} from "./ErrorMessage";
import fs from "fs/promises";
import path from "node:path";

export class ImageUtils {

    private static readonly SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    private static readonly UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'images');

    static decodeBase64Image(base64String: string): { buffer: Buffer, extension: string } {
        const matches = base64String.match(/^data:([^;]+);base64,(.+)$/);

        if (!matches) {
            throw new ValidationError(ErrorMessage.UNEXPECTED_ERROR);
        }

        const [, mimeType, data] = matches;

        if (!this.SUPPORTED_MIME_TYPES.includes(mimeType)) {
            throw new ValidationError(ErrorMessage.UNEXPECTED_ERROR);
        }

        const buffer = Buffer.from(data, 'base64');

        if (buffer.length > 5 * 1024 * 1024) {
            throw new ValidationError(ErrorMessage.UNEXPECTED_ERROR);
        }

        const extension = this.getExtensionFromMimeType(mimeType);

        return {buffer, extension};
    }

    static async ensureUploadDirectory(): Promise<void> {
        try {
            await fs.mkdir(this.UPLOAD_DIR, {recursive: true});
        } catch (error) {
            throw error;
        }
    }

    static async saveImageFile(buffer: Buffer, fileName: string): Promise<string> {
        await this.ensureUploadDirectory();

        const filePath = path.join(this.UPLOAD_DIR, fileName);

        try {
            await fs.writeFile(filePath, buffer);

            return filePath;

        } catch (error) {
            throw error;
        }
    }

    private static getExtensionFromMimeType(mimeType: string): string {
        const extensions: Record<string, string> = {
            'image/jpeg': '.jpeg', 'image/jpg': '.jpg', 'image/png': '.png', 'image/gif': '.gif', 'image/webp': '.webp',
        };

        return extensions[mimeType];
    }
}