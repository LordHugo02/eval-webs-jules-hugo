import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email of the user', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user', required: true })
  @IsString()
  password: string;
}
