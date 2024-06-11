import { IsString } from 'class-validator';

export class UpdateMaterialListRequestDTO {
  @IsString()
  title: string;
}
