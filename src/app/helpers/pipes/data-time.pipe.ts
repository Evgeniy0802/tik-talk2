import { Pipe, PipeTransform } from '@angular/core';

// @ts-ignore
@Pipe({
  name: 'dataTime',
  standalone: true,
})
export class DataTimePipe implements PipeTransform {
  transform(value: string | null): any {
    if (!value) return null;

    const firstDate = new Date(value.endsWith('Z') ? value : value + 'Z');
    const secondDate = new Date();
    const second = Math.floor(secondDate.getTime() - firstDate.getTime()) / 1000;

    if (second < 60) {
      return 'только что';
    }

    const minutes = Math.floor(second / 60);
    if (minutes < 60) {
      return `${minutes} ${this.getPlural(minutes, 'минута')} назад`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} ${this.getPlural(hours, 'час')} назад`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} ${this.getPlural(days, 'день')} назад`;
    }

    const month = Math.floor(days / 30);
    if (month < 12) {
      return `${month} ${this.getPlural(month, 'месяц')} назад`;
    }

    const years = Math.floor(month / 12);
    return `${years} ${this.getPlural(years, 'год')} назад`;
  }

  private getPlural(count: number, unit: string): string {
    const lastDigit = count % 10;
    const lastTwoDigit = count % 100;

    if (lastTwoDigit >= 11 && lastTwoDigit <= 19) {
      return this.getWord(unit, 'много');
    }

    if (lastDigit === 1) {
      return this.getWord(unit, 'один');
    }

    if (lastTwoDigit >= 2 && lastTwoDigit <= 4) {
      return this.getWord(unit, 'несколько');
    }

    return this.getWord(unit, 'много');
  }

  private getWord(unit: string, type: 'один' | 'несколько' | 'много'): string {
    switch (unit) {
      case 'год':
        if (type === 'один') return 'год';
        if (type === 'несколько') return 'года';
        return 'лет';
      case 'месяц':
        if (type === 'один') return 'месяц';
        if (type === 'несколько') return 'месяца';
        return 'месяцев';
      case 'день':
        if (type === 'один') return 'день';
        if (type === 'несколько') return 'дня';
        return 'дней';
      case 'час':
        if (type === 'один') return 'час';
        if (type === 'несколько') return 'часа';
        return 'часов';
      case 'минута':
        if (type === 'один') return 'минута';
        if (type === 'несколько') return 'минуты';
        return 'минут';
      case 'секунда':
        if (type === 'один') return 'секунда';
        if (type === 'несколько') return 'секунды';
        return 'секунд';
      default:
        return unit;
    }
  }
}
