import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
@Injectable()
export class CapitalizePipe implements PipeTransform {

  /**
   * Transforms a specific string to uppercase
   */
  transform(value: string = '') {
    return value.toString().charAt(0).toUpperCase() + value.slice(1);
  }
}
