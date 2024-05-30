import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayToString',
  standalone: true
})
export class ArrayToStringPipe implements PipeTransform {
  /**
   * The transform method is the implementation of the PipeTransform interface.
   * @param {any[]} array - The array to be transformed.
   * @param {string} [property] - The property name to be used when the array contains objects.
   *
   * @returns {string} - The transformed string.
   */
  transform(array: any[], property?: string): string {
    if (!array || array.length === 0) {
      return '';
    }

    if (typeof array[0] === 'object' && property) {
      return array.map(item => item[property]).join(', ');
    }

    if (typeof array[0] === 'string') {
      return array.join(', ');
    }

    return '';
  }

}
