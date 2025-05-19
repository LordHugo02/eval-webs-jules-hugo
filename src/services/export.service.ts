import { createObjectCsvWriter } from "csv-writer";
import * as fs from "fs";
import { Client } from "minio";
import * as os from "os";
import * as path from "path";
import { Reservation } from "../models/reservation.model";

export class ExportService {
  private minioClient: Client;
  private bucketName: string = "reservations-exports";

  constructor() {
    this.minioClient = new Client({
      endPoint: "localhost",
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
    });

    this.initializeBucket();
  }

  private async initializeBucket() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async exportReservationsToCSV(
    reservations: Reservation[],
    userId: string
  ): Promise<string> {
    const tempDir = os.tmpdir();
    const fileName = `reservations-${userId}-${Date.now()}.csv`;
    const filePath = path.join(tempDir, fileName);

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: "id", title: "ID" },
        { id: "userId", title: "User ID" },
        { id: "resourceId", title: "Resource ID" },
        { id: "startDate", title: "Start Date" },
        { id: "endDate", title: "End Date" },
        { id: "status", title: "Status" },
        { id: "createdAt", title: "Created At" },
        { id: "updatedAt", title: "Updated At" },
      ],
    });

    await csvWriter.writeRecords(reservations);

    // Upload to MinIO
    await this.minioClient.fPutObject(this.bucketName, fileName, filePath, {
      "Content-Type": "text/csv",
    });

    // Clean up temporary file
    fs.unlinkSync(filePath);

    return fileName;
  }

  async getExportUrl(fileName: string): Promise<string> {
    return await this.minioClient.presignedGetObject(
      this.bucketName,
      fileName,
      24 * 60 * 60
    ); // URL valide 24h
  }
}
