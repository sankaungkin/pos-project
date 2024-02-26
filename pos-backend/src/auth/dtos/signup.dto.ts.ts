import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'Daniel',
    required: true,
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'somebody@abc.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123abc777',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @ApiProperty({ example: 'ADMIN|USER' })
  @IsString()
  @MinLength(3)
  role: Role;
}
