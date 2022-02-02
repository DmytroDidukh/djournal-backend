import { PostBodyBlock } from './create-post.dto';

export class SearchPostDto {
  title?: string;
  description?: string;
  body?: PostBodyBlock[];
  views?: 'DESC' | 'ASC';
  tag?: string;
  limit? = 0;
  take? = 10;
}
