/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @ApiProperty({ description: 'User ID', required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ description: 'Room ID', required: false })
  @IsOptional()
  @IsNumber()
  roomId?: number;

  @ApiProperty({
    description: 'Start time in ISO8601 format (YYYY-MM-DDTHH:mm:ss)',
    required: false,
    example: '2024-03-20T14:30:00',
  })
  @IsOptional()
  @IsISO8601()
  startTime?: string;

  @ApiProperty({
    description: 'End time in ISO8601 format (YYYY-MM-DDTHH:mm:ss)',
    required: false,
    example: '2024-03-20T15:30:00',
  })
  @IsOptional()
  @IsISO8601()
  endTime?: string;
}
