import { DateTime } from 'luxon';

export function convertToShortDate(date) {
  return `${date.c.year}-${date.c.month <= 9 ? '0'+date.c.month.toString() : date.c.month}-${date.c.day <= 9 ? '0'+date.c.day : date.c.day}`
}