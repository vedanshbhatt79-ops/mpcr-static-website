import { fmt } from '../utils/date'

/**
 * Adani Electricity – request for a temporary festival meter connection.
 * All dates come from the Ctx passed to build() so this template stays current
 * as UTSAV_DATES changes each year.
 */
const adaniTemplate = {
  id: 'adani-meter',
  title: 'Adani Electricity – Temporary Festival Meter',
  build(ctx) {
    return {
      lang: 'en',
      date: fmt(ctx.letterDate),
      to: [
        'To,',
        'The Customer Relations Officer,',
        'Adani Electricity Mumbai Limited,',
        'Mumbai.',
      ],
      subject: 'Request for Temporary Festival Meter Connection',
      salutation: 'Respected Sir/Madam,',
      paragraphs: [
        'We, Modi Park Cha Raja Association, on behalf of the residents of Modi Park Society, located at Irani Wadi No. 3, Kandivali (West), Mumbai – 400067, wish to request a temporary festival power connection (Festival Meter) for our society premises in view of the upcoming Ganesh Chaturthi festival celebrations.',
        'We kindly request you to provide the temporary festival meter connection for the following duration:',
        `From: ${fmt(ctx.fromDate)} To: ${fmt(ctx.toDate)}`,
        'This connection is required to arrange for decorative lighting, sound system, mandap illumination, and other festival-related electrical requirements for the Ganesh Chaturthi celebrations to be held within our society premises.',
        'We assure you that all safety norms and guidelines will be strictly followed during the usage of this temporary connection, and the same will be duly disconnected/surrendered after the completion of the festival period as mentioned above.',
        'We request you to kindly process our application at the earliest and depute your concerned staff to carry out the necessary inspection and installation formalities.',
        'We would be grateful for your prompt assistance in this regard.',
      ],
      closing: ['Thanking you,', 'Yours faithfully,'],
    }
  },
}

export default adaniTemplate
