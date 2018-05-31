import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsFilter'
})
@Injectable()
export class ItemsFilterPipe implements PipeTransform {

  /**
   * Filters a set of items if they hold, within a property, a set of items (for instance, a recipe must have specific ingredients)
   */
  transform(items: Array<any> = [], prop: string = '', queryItems: Array<string> = []) {
    if (!!items && !!items.length) {
      if (!!queryItems && !!queryItems.length && !!prop) {
        let foundIt: number;
        return items.filter(item => {
          foundIt = 0;
          queryItems.forEach((query: string) => {
            if (!!item[prop].find((val: { name: string }) => val.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))) {
              foundIt++;
            }
          });

          return foundIt === queryItems.length;
        });
      } else {
        return items;
      }
    } else {
      return [];
    }
  }
}
