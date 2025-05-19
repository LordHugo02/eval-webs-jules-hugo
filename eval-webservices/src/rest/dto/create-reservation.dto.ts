/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ description: 'User ID', required: true })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Room ID', required: true })
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: 'Start time in ISO8601 format (YYYY-MM-DDTHH:mm:ss)',
    required: true,
    example: '2024-03-20T14:30:00',
  })
  @IsISO8601()
  startTime: string;

  @ApiProperty({
    description: 'End time in ISO8601 format (YYYY-MM-DDTHH:mm:ss)',
    required: true,
    example: '2024-03-20T15:30:00',
  })
  @IsISO8601()
  endTime: string;
}
