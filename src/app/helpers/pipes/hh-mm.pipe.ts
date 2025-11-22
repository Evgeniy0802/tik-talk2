import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhMm',
})
export class HhMmPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Создаем объект Date из входящего значения
    const date = new Date(value);

    // Получаем часы и минуты, дополняя их нулями, если они меньше 10
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
