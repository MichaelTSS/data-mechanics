import React from 'react'
import TimerIcon from '@material-ui/icons/Timer'
import { getHumanDuration } from '../utils'


export default function Duration (props) {
  let text = ''
  const { startAt, endAt } = props
  if (endAt) {
    text = getHumanDuration({ startAt, endAt })
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
