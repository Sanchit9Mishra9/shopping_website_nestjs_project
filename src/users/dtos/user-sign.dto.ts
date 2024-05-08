import { IsString } from 'class-validator';

export class userSigndto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
