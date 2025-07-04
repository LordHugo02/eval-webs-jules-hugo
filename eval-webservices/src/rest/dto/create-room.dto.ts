/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ description: 'Name of the room', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Capacity of the room', required: true })
  @IsInt()
  capacity: number;

  @ApiProperty({ description: 'Description of the room', required: true })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Location of the room', required: true })
  @IsString()
  location: string;
}
