import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegionDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  readonly slug: string;

  @IsNumber()
  readonly parentId: number | null;
}
