/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ description: 'Name of the room', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Capacity of the room', required: false })
  @IsNumber()
  capacity?: number;

  @ApiProperty({ description: 'Description of the room', required: false })
  @IsString()
  location?: string;
}
