import { IsBoolean, IsString } from 'class-validator';

export class MaterialListItemRequestDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  mandatory: boolean;
}
