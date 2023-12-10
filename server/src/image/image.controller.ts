import Path = require('path');
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { MicrosoftGuard } from '@/setup/microsoft.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { randomUUID } from 'crypto';
import { createReadStream, rm } from 'fs';
import { join } from 'path';

@Controller('images')
export class ImageController {
  @Get(':filename')
  get(@Param('filename') filename: string) {
    const file = createReadStream(join(process.cwd(), `/images/${filename}`));
    return new StreamableFile(file);
  }

  @UseGuards(MicrosoftGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      storage: diskStorage({
        destination: 'images',
        filename: (_req, file, cb) => {
          const filename: string = 'image-' + randomUUID();
          const extension: string = Path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }

  @UseGuards(MicrosoftGuard)
  @Delete(':filename')
  delete(@Param('filename') filename: string) {
    rm(join(process.cwd(), `/images/${filename}`), () => {
      // No error handling
    });
  }
}
