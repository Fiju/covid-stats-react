/**
 *
 * @param date Date time object
 * @returns {string} Date string extracted fromthe whole ISOstring
 */
export function getIsoDate(date: Date) {
  return date.toISOString().substring(0, 10);
}
