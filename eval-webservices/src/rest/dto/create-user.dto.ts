import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user', required: true })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email of the user', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'First name of the user', required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Password of the user', required: true })
  @IsString()
  @MinLength(8)
  password: string;
}
