export class CategoryJsonDTO {
  readonly name: string;
  readonly slug: string;
  readonly children: CategoryJsonDTO[];
}
