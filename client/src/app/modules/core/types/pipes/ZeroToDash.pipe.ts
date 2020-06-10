import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'zeroToDash'})
export class ZeroToDashPipe implements PipeTransform {
  transform(initial: number): string {
    if (initial == 0)
      return '-';
    return String(initial) + ' Kč';
  }
}
