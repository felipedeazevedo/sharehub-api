import { IsString } from 'class-validator';

export class CreateMaterialListRequestDTO {
  @IsString()
  title: string;
}
