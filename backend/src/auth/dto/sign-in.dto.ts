import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDTO {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
