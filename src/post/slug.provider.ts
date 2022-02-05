import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

export const slugifyConfig = {
  replacement: '-', // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
  locale: 'en', // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
};

@Injectable()
export class SlugProvider {
  slugify(slug: string): string {
    return slugify(slug, slugifyConfig);
  }
}
