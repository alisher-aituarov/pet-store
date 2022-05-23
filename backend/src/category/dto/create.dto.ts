import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  readonly slug: string;

  @IsNumber()
  readonly parentId: number | null;
}
