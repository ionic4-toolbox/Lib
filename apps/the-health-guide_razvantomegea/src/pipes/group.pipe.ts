import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  /**
   * Groups the items according to their index (used for UI Grid representation iterations)
   */
  transform(items: Array<any> = [], columns: number = 0, colNr: number = 0) {
    return (!!items && !!items.length) ? items.filter((item, index) => index % columns === colNr - 1) : [];
  }
}
