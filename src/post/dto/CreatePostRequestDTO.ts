import { IsString } from 'class-validator';

export class PostRequestDTO {
  @IsString()
  title: string;
}
