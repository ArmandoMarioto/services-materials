import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'username must be a string' })
  username: string;
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  password: string;
}
