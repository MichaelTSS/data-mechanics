import moment from 'moment'

export const RUNNING = 'RUNNING'
export const PENDING = 'PENDING'
export const COMPLETED = 'COMPLETED'
export const FAILED = 'FAILED'

export const getHumanDuration = function ({ startAt, endAt, duration }) {
  if (startAt && endAt) {
    const startM = moment(startAt)
    const endM = moment(endAt)
    duration = endM.diff(startM)
  }
  duration = moment.duration(duration)
  const H = duration.get('hours')
  const M = duration.get('minutes')
  const S = duration.get('seconds')
  const hours = (String(H).length === 2) ? H : `0${H}`
  const minutes = (String(M).length === 2) ? M : `0${M}`
  const seconds = (String(S).length === 2) ? S : `0${S}`
  return `${hours}:${minutes}:${seconds}`
}