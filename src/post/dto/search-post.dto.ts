export class SearchPostDto {
  title?: string;
  body?: string;
  views?: 'DESC' | 'ASC';
  tag?: string;
  limit? = 0;
  take? = 10;
}
