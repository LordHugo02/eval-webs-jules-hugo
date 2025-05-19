/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Name of the room', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Capacity of the room', required: true })
  @IsNumber()
  capacity: number;

  @ApiProperty({ description: 'Location of the room', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
