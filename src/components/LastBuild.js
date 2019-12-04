import React from 'react'
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip'
import EventIcon from '@material-ui/icons/Event'


export default function LastBuild (props) {
  const text = moment(props.value).fromNow()
  //
  return (
    <React.Fragment>
      <Tooltip title={props.value} arrow>
        <div className="LastBuild">
          <EventIcon /><span>{text}</span>
        </div>
      </Tooltip>
    </React.Fragment>
  )
}
