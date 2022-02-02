import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface PostBodyBlock {
  id: string;
  type: string;
  data: {
    text: string;
  };
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  body?: PostBodyBlock[];

  @IsOptional()
  @IsArray()
  tags?: string[];
}
