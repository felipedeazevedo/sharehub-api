import { IsString } from 'class-validator';

export class MaterialListRequestDTO {
  @IsString()
  title: string;
}
