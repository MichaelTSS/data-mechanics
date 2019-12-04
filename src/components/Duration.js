import React from 'react'
import moment from 'moment'
import TimerIcon from '@material-ui/icons/Timer'


export default function Duration (props) {
  let text = ''
  const { startAt, endAt } = props
  const startM = moment(startAt)
  if (endAt) {
    const endM = moment(endAt)
    const duration = moment.duration(endM.diff(startM))
    const H = duration.get('hours')
    const M = duration.get('minutes')
    const S = duration.get('seconds')
    const hours = (String(H).length === 2) ? H : `0${H}`
    const minutes = (String(M).length === 2) ? M : `0${M}`
    const seconds = (String(S).length === 2) ? S : `0${S}`
    text = `${hours}:${minutes}:${seconds}`
  }
  //
  return (
    <React.Fragment>
      <div className="Duration">
        <TimerIcon /><span>{text}</span>
      </div>
    </React.Fragment>
  )
}
