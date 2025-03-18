/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({
    description: 'User ID associated with the reservation',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @ApiProperty({
    description: 'Room ID associated with the reservation',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  room_id?: string;

  @ApiProperty({
    description: 'Start time of the reservation',
    required: false,
  })
  @IsOptional()
  @IsDate()
  start_time?: Date;

  @ApiProperty({ description: 'End time of the reservation', required: false })
  @IsOptional()
  @IsDate()
  end_time?: Date;

  @ApiProperty({ description: 'Status of the reservation', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}
