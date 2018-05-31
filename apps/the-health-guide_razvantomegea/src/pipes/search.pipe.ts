import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
@Injectable()
export class SearchPipe implements PipeTransform {

  /**
   * Filters items by their name and limits their number
   */
  transform(items: Array<{ name: string }> = [], searchQuery: string = '', limit: number = Number.MAX_SAFE_INTEGER) {
    let match: boolean = false,
      tokens: Array<string> = [...searchQuery.split(' ').map((token: string) => token.trim().toLocaleLowerCase())];

    return (!!items && !!items.length) ? items.filter((item: { name: string }, idx: number) => {
      match = false;
      if (idx < limit) {
        tokens.forEach((token: string) => match = item.name.toLocaleLowerCase().includes(token));
      }

      return match;
    }) : [];
  }
}
