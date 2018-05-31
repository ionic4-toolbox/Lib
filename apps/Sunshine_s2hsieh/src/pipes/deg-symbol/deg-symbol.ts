import { Pipe, PipeTransform } from '@angular/core';
import { Degree } from '../../providers/strings';

@Pipe({
  name: 'degSymbol',
})
export class DegSymbolPipe implements PipeTransform {
  transform(degree:string) {
    switch (degree) {
      case Degree.metric:
        return String.fromCharCode(8451);
      case Degree.imperial:
        return String.fromCharCode(8457);
    }
  }
}
