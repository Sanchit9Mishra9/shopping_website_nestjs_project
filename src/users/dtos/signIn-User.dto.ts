import { IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
