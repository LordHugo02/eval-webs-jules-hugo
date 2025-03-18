/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'User ID associated with the reservation' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ description: 'Room ID associated with the reservation' })
  @IsUUID()
  room_id: string;

  @ApiProperty({ description: 'Start time of the reservation' })
  @IsDate()
  start_time: Date;

  @ApiProperty({ description: 'End time of the reservation' })
  @IsDate()
  end_time: Date;

  @ApiProperty({ description: 'Status of the reservation' })
  @IsString()
  status: string;
}
