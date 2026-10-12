import { UTSAV_DATES } from '../constants/constants'

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function parseYmd(value) {
  const year = Number(value.slice(0, 4))
  const month = Number(value.slice(4, 6))
  const day = Number(value.slice(6, 8))
  return new Date(year, month - 1, day)
}

export function ordinal(day) {
  const rem100 = day % 100
  if (rem100 >= 11 && rem100 <= 13) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

/** "4th September 2026" — used on permission letters. */
export function fmt(date) {
  return `${date.getDate()}${ordinal(date.getDate())} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/** "4 September 2026" — plain site display. */
export function formatDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/** "2026-09-04" — local ISO-style date, used in download filenames. */
export function isoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function weekday(date) {
  return WEEKDAYS[date.getDay()]
}

export function getUtsavStart() {
  return parseYmd(UTSAV_DATES.startDate)
}

export function getUtsavEnd() {
  return parseYmd(UTSAV_DATES.endDate)
}

const DEV_DIGITS = '०१२३४५६७८९'
const DEV_MONTHS = [
  'जानेवारी',
  'फेब्रुवारी',
  'मार्च',
  'एप्रिल',
  'मे',
  'जून',
  'जुलै',
  'ऑगस्ट',
  'सप्टेंबर',
  'ऑक्टोबर',
  'नोव्हेंबर',
  'डिसेंबर',
]

/** Replace ASCII digits with Devanagari digits. */
export function toDev(value) {
  return String(value).replace(/\d/g, (digit) => DEV_DIGITS[Number(digit)])
}

/** "१४ सप्टेंबर २०२६" — Marathi long date. */
export function fmtMr(date) {
  return `${toDev(date.getDate())} ${DEV_MONTHS[date.getMonth()]} ${toDev(date.getFullYear())}`
}

/** "१९/०८/२०२६" — Marathi numeric date. */
export function fmtMrNumeric(date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return toDev(`${dd}/${mm}/${date.getFullYear()}`)
}

/** Inclusive day count between two dates. */
export function daysInclusive(from, to) {
  return Math.round((to - from) / 86400000) + 1
}

/**
 * True once the configured festival has already ended, i.e. UTSAV_DATES needs
 * updating for the next year. This is the single place the yearly edit is
 * detected.
 */
export function isUtsavStale(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return getUtsavEnd() < today
}
