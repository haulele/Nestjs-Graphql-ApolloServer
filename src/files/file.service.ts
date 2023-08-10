import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { FileUpload } from './file.entity';
import { unlink } from 'fs/promises';
import { pathURL } from './file.refactorurl';
import * as sharp from 'sharp';


@Injectable()
export class LocalFileService {
  private readonly uploadDirectory = 'uploads';

  async uploadFile(file: FileUpload, fileName: string): Promise<{ url: string, altText: string }[]> {
    const largeWidth = 800;
    const largeHeight = 600;
    const mediumWidth = 400;
    const mediumHeight = 300;
    const smallWidth = 200;
    const smallHeight = 150;
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    const {mimetype} = file;
    if (!mimetype || !mimetype.startsWith('image/')) {
      throw new Error('Invalid file type. Only images are allowed.');
    }
    const filePath = join(this.uploadDirectory, fileName);
    const writeStream = createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      file.createReadStream().pipe(writeStream);
    });
    const resizedFilePathL = pathURL(filePath, 'L');
    const resizedFilePathM = pathURL(filePath, 'M');
    const resizedFilePathS = pathURL(filePath, 'S');
    await sharp(filePath).resize(largeWidth, largeHeight).jpeg({ quality: 50 }).toFile(resizedFilePathL);
    await sharp(filePath).resize(mediumWidth, mediumHeight).jpeg({ quality: 50 }).toFile(resizedFilePathM);
    await sharp(filePath).resize(smallWidth, smallHeight).jpeg({ quality: 50 }).toFile(resizedFilePathS);
    return [
      { url: `${baseUrl}${port}/${filePath}`, altText: "N" },
      { url: `${baseUrl}${port}/${resizedFilePathL}`, altText: "L" },
      { url: `${baseUrl}${port}/${resizedFilePathM}`, altText: "M" },
      { url: `${baseUrl}${port}/${resizedFilePathS}`, altText: "S" },
    ];
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = join(this.uploadDirectory, fileName);
    await unlink(filePath);
  }
  
}

