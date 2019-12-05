import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

import { StatusIcon, StatusIconList } from '../components/StatusIcon'
import LastBuild from '../components/LastBuild'
import Duration from '../components/Duration'

export default function AppFocusTable (props) {
  if (props.isLoading) return null
  if (!props.app) return null
  //
  const name = props.app.appName
  const status = props.app.status.applicationState.state


  function getNbExecutorsLabel () {
    if (!props.app.status.executorState) return ''
    const count = Object.keys(props.app.status.executorState).length
    if (count > 1) return `${count} executors`
    return `${count} executor`
  }

  return (
    <div className="table">
      <div className="table__row">
        <div className="table__row__cell table__row__cell--label">
          Status:
            </div>
        <div className="table__row__cell table__row__cell--value">
          <StatusIcon status={status} name={name} />
        </div>
      </div>
      <div className="table__row">
        <div className="table__row__cell table__row__cell--label">
          Executors:
            </div>
        <Tooltip title={getNbExecutorsLabel()} arrow>
          <div className="table__row__cell table__row__cell--value">
            <StatusIconList value={props.app.status.executorState} />
          </div>
        </Tooltip>
      </div>
      <div className="table__row">
        <div className="table__row__cell table__row__cell--label">
          Duration:
            </div>
        <div className="table__row__cell table__row__cell--value">
          <Duration startAt={props.app.status.lastSubmissionAttemptTime} endAt={props.app.status.terminationTime} />
        </div>
      </div>
      <div className="table__row">
        <div className="table__row__cell table__row__cell--label">
          Last build:
            </div>
        <div className="table__row__cell table__row__cell--value">
          <LastBuild value={props.app.status.lastSubmissionAttemptTime} />
        </div>
      </div>
    </div>
)
}