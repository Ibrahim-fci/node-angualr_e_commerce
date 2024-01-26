import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {

  transform(originalPrice: number, discount: number): number {
    if (originalPrice && discount) {
      // Calculate the discounted price
      const discountAmount = (originalPrice * discount) / 100;
      return originalPrice - discountAmount;
    }
    return originalPrice;
  }
}
