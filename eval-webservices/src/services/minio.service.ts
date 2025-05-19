import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.configService.get<string>('MINIO_PORT', '9000')),
      useSSL:
        this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true',
      accessKey: this.configService.get<string>(
        'MINIO_ACCESS_KEY',
        'minioadmin',
      ),
      secretKey: this.configService.get<string>(
        'MINIO_SECRET_KEY',
        'minioadmin',
      ),
    });

    this.bucketName = this.configService.get<string>(
      'MINIO_BUCKET',
      'reservations',
    );
    this.initializeBucket();
  }

  private async initializeBucket() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async uploadFile(filePath: string, fileName: string): Promise<string> {
    await this.minioClient.fPutObject(this.bucketName, fileName, filePath, {
      'Content-Type': 'text/csv',
    });

    return `${this.configService.get<string>('MINIO_PUBLIC_URL')}/${this.bucketName}/${fileName}`;
  }

  async getFileUrl(fileName: string): Promise<string> {
    return `${this.configService.get<string>('MINIO_PUBLIC_URL')}/${this.bucketName}/${fileName}`;
  }
}
