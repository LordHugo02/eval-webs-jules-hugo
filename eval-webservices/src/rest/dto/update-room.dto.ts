/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto {
  @ApiProperty({ description: 'Name of the room', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Capacity of the room', required: false })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({ description: 'Description of the room', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
