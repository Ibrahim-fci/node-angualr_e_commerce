import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransform',
  standalone: true
})
export class TextTransformPipe implements PipeTransform {

  transform(description: string): string {
    if (description.length > 50) {
      return description.slice(0, 50) + " read more ..."
    }
    return description + " read more ...";
  }

}
