import React from 'react'
import {
  NavLink
} from 'react-router-dom'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import Tooltip from '@material-ui/core/Tooltip'

import { COMPLETED, RUNNING, PENDING, FAILED } from '../utils/statuses'


export const StatusIcon = function (props) {
  let icon;
  if (props.status === COMPLETED) icon = <CheckIcon />
  else if (props.status === RUNNING) icon = <TimelapseIcon />
  else if (props.status === PENDING) icon = <HourglassEmptyIcon />
  else if (props.status === FAILED) icon = <CloseIcon />
  //
  if (props.to == null) return (
    <div className={`StatusIcon StatusIcon--slim StatusIcon--${props.status.toLowerCase()}`}>
      <Tooltip title={props.name.toLowerCase()} arrow>{icon}</Tooltip>
    </div>
  )
  //
  return (
    <div className={`StatusIcon StatusIcon--${props.status.toLowerCase()}`}>
      <Tooltip title={props.name.toLowerCase()} arrow>
        <NavLink to={props.to}>
          {icon}<span>{props.status.toLowerCase()}</span>
        </NavLink>
      </Tooltip>
    </div>
  )
}

export const StatusIconList = function (props) {
  if (props.value == null) return null
  //
  const executors = Object.keys(props.value).map(key => {
    const status = props.value[key]
    return <StatusIcon fontSize="small" key={key} name={key} status={status} />
  })
  return (
    <React.Fragment>
      {executors}
    </React.Fragment>
  )
}
