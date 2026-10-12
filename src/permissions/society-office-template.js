import { fmt } from '../utils/date'

/**
 * Society office + keys permission letter for a specific building.
 *
 * The meeting window is always 1st August to 30th September of the year the
 * letter is generated (i.e. the download year), so it rolls forward on its own.
 * @param {number} buildingNo
 */
export function createSocietyOfficeTemplate(buildingNo) {
  return {
    id: `society-office-bldg${buildingNo}`,
    title: `Modi Park Cha Raja Society Office Permission Letter – BLDG No. ${buildingNo}`,
    build(ctx) {
      const year = ctx.letterDate.getFullYear()
      const windowFrom = fmt(new Date(year, 7, 1))
      const windowTo = fmt(new Date(year, 8, 30))

      return {
        lang: 'en',
        date: fmt(ctx.letterDate),
        to: [
          'To,',
          'The Secretary,',
          'Modi Park Co-operative Housing Society,',
          `Building No. ${buildingNo},`,
          'Kandivali West, Mumbai.',
        ],
        subject: `Requirement of Society Office and keys for Ganesh Utsav ${year} discussions and meetings`,
        salutation: 'Respected Sir,',
        paragraphs: [
          `We, the members of Modi Park Mitra Mandal - Ganesh Utsav, wish to inform you of our requirement of the Society Office for holding discussion meetings related to the planning and organization of Modi Park Ganesh Utsav ${year}, from ${windowFrom} to ${windowTo}.`,
          'We therefore request that the keys of the Society Office be handed over to us for the said purpose.',
          'We assure you that the office premises will be used responsibly and handed back in proper condition after every meeting.',
          'Kindly arrange for the same at the earliest, as the meetings need to commence soon in preparation for the festival.',
        ],
        closing: ['Thanking you,', 'Yours faithfully,'],
        signature: 'Modi Park Mitra Mandal - Ganesh Utsav',
        boldPhrases: [
          'Modi Park Mitra Mandal - Ganesh Utsav',
          `Modi Park Ganesh Utsav ${year}`,
          `${windowFrom} to ${windowTo}`,
        ],
        datePlacement: 'afterTo',
        dateBoldLabel: true,
        subjectAlign: 'left',
        boldFirstLine: true,
      }
    },
  }
}
