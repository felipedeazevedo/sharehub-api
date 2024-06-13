import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MaterialListItemRequestDTO } from '../../material-list-item/dto/MaterialListItemRequestDTO';

export class UpdateMaterialListRequestDTO {
  @IsNumber()
  semester: number;

  @IsString()
  discipline: string;

  @IsNumber()
  teacherId: number;

  @IsNotEmpty()
  items: MaterialListItemRequestDTO[];
}
