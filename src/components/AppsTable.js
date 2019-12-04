import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

import { StatusIcon, StatusIconList } from './StatusIcon'
import LastBuild from './LastBuild'
import Duration from './Duration'
import Button from './Button'
import { COMPLETED, RUNNING, PENDING, FAILED } from '../utils'

class AppRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { isLoading: false }
  }

  getCTA() {
    if ([RUNNING, PENDING].includes(this.props.app.status.applicationState.state)) {
      return <Button title="Stop" icon="StopIcon" onClick={this.handleClick.bind(this)} />
    }
    if ([COMPLETED, FAILED].includes(this.props.app.status.applicationState.state)) {
      return <Button title="Delete" icon="DeleteIcon" onClick={this.handleClick.bind(this)} />
    }
  }

  handleClick(action) {
    if (action === 'stop') this.props.onStop()
    else if (action === 'delete') {
      this.setState({
        isDeleting: true
      })
      this.props.onDelete()
    }
  }

  getNbExecutorsLabel() {
    if (!this.props.app.status.executorState) return ''
    const count = Object.keys(this.props.app.status.executorState).length
    if (count > 1) return `${count} executors`
    return `${count} executor`
  }

  render() {
    const name = this.props.app.appName
    const status = this.props.app.status.applicationState.state
    //
    return (
      <div className="table__row">
        <div className="table__row__cell table__row__cell--status">
          <StatusIcon to={`/apps/${name}`} status={status} name={name} />
        </div>
        <Tooltip title={this.getNbExecutorsLabel()} arrow>
          <div className="table__row__cell table__row__cell--executors">
            <StatusIconList value={this.props.app.status.executorState} />
          </div>
        </Tooltip>
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
    this.props.onStop(appName)
  }

  handleDelete(appName) {
    this.props.onDelete(appName)
  }

  render() {
    if (this.props.isLoading) {
      return null
    }
    //
    const tableRows = this.props.apps.filter(app => {
      if (this.props.statusFilter === '') return true // return all if not set
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