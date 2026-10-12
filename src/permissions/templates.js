import { UTSAV_DATES } from '../constants/constants'
import { parseYmd } from '../utils/date'
import adaniTemplate from './adani-template'
import { createSocietyOfficeTemplate } from './society-office-template'
import soundPermissionTemplate from './sound-permission-template'

/**
 * @typedef {Object} Letter
 * @property {string} date
 * @property {string[]} to
 * @property {string} subject
 * @property {string} salutation
 * @property {string[]} paragraphs
 * @property {string[]} closing
 * @property {'en'|'mr'} [lang] Letter language; defaults to 'en'.
 * @property {string[]} [boldPhrases] Per-template inline bold phrases.
 * @property {'beforeTo'|'afterTo'} [datePlacement]
 * @property {boolean} [dateBoldLabel]
 * @property {'left'|'right'} [dateAlign]
 * @property {'left'|'center'} [subjectAlign]
 * @property {boolean} [boldFirstLine] Bold the first `to` entry (e.g. "To,").
 * @property {string} [signature]
 */

/**
 * @typedef {Object} Ctx
 * @property {Date} letterDate
 * @property {Date} fromDate
 * @property {Date} toDate
 */

/**
 * @typedef {Object} Run
 * @property {string} text
 * @property {boolean} bold
 */

/**
 * @typedef {Object} Block
 * @property {string} type
 * @property {'left'|'center'|'right'|'justify'} [align]
 * @property {number} [size]
 * @property {Run[]} runs
 */

const LETTERHEAD = [
  'MODI PARK CHA RAJA ASSOCIATION',
  'CIN: U88900MH2023NPL408060',
  'Modi Park, Irani Wadi Road No. 3, Kandivali West, Mumbai – 400067',
]

const BOLD_PHRASES = [
  'Modi Park Cha Raja Association',
  'Modi Park Society',
  'Irani Wadi No. 3, Kandivali (West), Mumbai – 400067',
  'Ganesh Chaturthi',
]

export function buildCtx() {
  return {
    letterDate: new Date(),
    fromDate: parseYmd(UTSAV_DATES.startDate),
    toDate: parseYmd(UTSAV_DATES.endDate),
  }
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function boldSegments(text, phrases = BOLD_PHRASES) {
  const sorted = [...phrases].sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${sorted.map(escapeRegExp).join('|')})`, 'g')
  const runs = []
  let last = 0
  let match
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      runs.push({ text: text.slice(last, match.index), bold: false })
    }
    runs.push({ text: match[0], bold: true })
    last = match.index + match[0].length
  }
  if (last < text.length) {
    runs.push({ text: text.slice(last), bold: false })
  }
  if (runs.length === 0) {
    runs.push({ text, bold: false })
  }
  return runs
}

/**
 * Turn a Letter into ordered, renderer-agnostic blocks. Word, PDF and the
 * in-browser preview all render from this so they stay in sync.
 * @param {Letter} letter
 * @returns {Block[]}
 */
export function letterToBlocks(letter) {
  const isMr = letter.lang === 'mr'
  const blocks = [
    { type: 'letterhead', align: 'center', size: 14, runs: [{ text: LETTERHEAD[0], bold: true }] },
  ]

  for (let i = 1; i < LETTERHEAD.length; i += 1) {
    blocks.push({
      type: 'letterhead',
      align: 'center',
      size: 12,
      runs: [{ text: LETTERHEAD[i], bold: true }],
    })
  }

  blocks.push({ type: 'rule', runs: [] })

  const datePlacement = letter.datePlacement || 'beforeTo'
  const dateAlign = letter.dateAlign || (datePlacement === 'afterTo' ? 'left' : 'right')
  const dateRuns = isMr
    ? [{ text: letter.date, bold: false }]
    : letter.dateBoldLabel
      ? [{ text: 'Date:', bold: true }, { text: ` ${letter.date}`, bold: false }]
      : [{ text: `Date: ${letter.date}`, bold: false }]
  const dateBlock = { type: 'date', align: dateAlign, runs: dateRuns }

  if (datePlacement !== 'afterTo') blocks.push(dateBlock)

  letter.to.forEach((line, index) => {
    const bold = (isMr || !!letter.boldFirstLine) && index === 0
    blocks.push({ type: 'to', align: 'left', runs: [{ text: line, bold }] })
  })

  if (datePlacement === 'afterTo') blocks.push(dateBlock)

  let subjectRuns = [{ text: letter.subject, bold: true }]
  if (isMr && letter.subject.includes(':')) {
    const labelEnd = letter.subject.indexOf(':') + 1
    subjectRuns = [
      { text: letter.subject.slice(0, labelEnd), bold: true },
      { text: letter.subject.slice(labelEnd), bold: false },
    ]
  }
  blocks.push({
    type: 'subject',
    align: letter.subjectAlign || (isMr ? 'left' : 'center'),
    runs: subjectRuns,
  })
  blocks.push({
    type: 'salutation',
    align: 'left',
    runs: [{ text: letter.salutation, bold: false }],
  })

  letter.paragraphs.forEach((text) => {
    if (!isMr && /^From:/.test(text)) {
      blocks.push({ type: 'fromto', align: 'left', runs: [{ text, bold: true }] })
    } else {
      blocks.push({
        type: 'paragraph',
        align: isMr ? 'left' : 'justify',
        runs: isMr ? [{ text, bold: false }] : boldSegments(text, letter.boldPhrases),
      })
    }
  })

  letter.closing.forEach((line) => {
    blocks.push({ type: 'closing', align: 'left', runs: [{ text: line, bold: false }] })
  })

  if (letter.signature) {
    blocks.push({
      type: 'signature',
      align: 'left',
      runs: [{ text: letter.signature, bold: false }],
    })
  }

  return blocks
}

/**
 * Registry of permission-letter templates. To add a permission, create a new
 * `*-template.js` next to this file and add it to this array.
 */
export const PERMISSIONS = [
  adaniTemplate,
  createSocietyOfficeTemplate(1),
  createSocietyOfficeTemplate(2),
  soundPermissionTemplate,
]
