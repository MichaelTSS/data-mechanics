import React from 'react'

import { StatusIcon, StatusIconList } from './StatusIcon'
import LastBuild from './LastBuild'
import Duration from './Duration'
import Button from './Button'
import { COMPLETED, RUNNING, PENDING, FAILED } from '../utils/statuses'

class AppRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { isLoading: false }
  }

  getCTA() {
    if ([RUNNING, PENDING].includes(this.props.app.status.applicationState.state)) {
      return <Button title="Stop app execution" icon="StopIcon" onClick={this.handleClick.bind(this)} />
    }
    if ([COMPLETED, FAILED].includes(this.props.app.status.applicationState.state)) {
      return <Button title="Delete app from dashboard" icon="DeleteIcon" onClick={this.handleClick.bind(this)} />
    }
  }

  handleClick(action) {
    if (action === 'stop') this.props.onStop()
    else if (action === 'delete') this.props.onDelete()
  }

  render() {
    const name = this.props.app.appName
    const status = this.props.app.status.applicationState.state
    // const cta
    //
    return (
      <div className="table__row">
        <div className="table__row__cell table__row__cell--status">
          <StatusIcon to={`/apps/${name}`} status={status} name={name} />
        </div>
        <div className="table__row__cell table__row__cell--executors">
          <StatusIconList value={this.props.app.status.executorState} />
        </div>
        <div className="table__row__cell table__row__cell--duration">
          <Duration startAt={this.props.app.status.lastSubmissionAttemptTime} endAt={this.props.app.status.terminationTime} />
          <LastBuild value={this.props.app.status.lastSubmissionAttemptTime} />
        </div>
        <div className="table__row__cell table__row__cell--cta">
          {this.getCTA()}
        </div>
      </div>
    )
  }
}

export default class AppsTable extends React.Component {
  constructor(props) {
    super(props)
    this.handleStop = this.handleStop.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleStop(appName) {
    console.log('stopping this', appName)
  }

  handleDelete(appName) {
    console.log('deleting this', appName)
  }

  render() {
    if (this.props.isLoading) {
      return null
    }
    //
    const tableRows = this.props.apps.filter(app => {
      if (this.props.statusFilter == null) return true // return all if not set
      return app.status.applicationState.state === this.props.statusFilter // only return the ones we want
    }).map((app) =>
      <AppRow
        key={app.appName}
        app={app}
        status={app.status.applicationState.state}
        onStop={this.handleStop.bind(this, app.appName)}
        onDelete={this.handleDelete.bind(this, app.appName)}
      />
    )
    return (
      <React.Fragment>
        <div className="table__row table__row--header">
          <div className="table__row__cell table__row__cell--status">
            <span>Status</span>
          </div>
          <div className="table__row__cell table__row__cell--executors">
            <span>Executors</span>
          </div>
          <div className="table__row__cell table__row__cell--duration"></div>
          <div className="table__row__cell table__row__cell--cta"></div>
        </div>
        {tableRows}
      </React.Fragment>
    )
  }
}