import React from 'react'
import moment from 'moment'

import AppsTable from '../components/AppsTable'
import Metric from '../components/Metric'
import Loader from '../components/Loader'
import Filters from '../components/Filters'
import Button from '../components/Button'
import { RUNNING, FAILED, getHumanDuration } from '../utils'

export default class AppsList extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = { isLoading: true, apps: [], statusFilter: '' }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
    return fetch(`${process.env.REACT_APP_API_HOST}/apps`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          apps: data.slice()
        })
      })
  }

  handleRefresh() {
    this.setState({
      isLoading: true,
      apps: []
    })
    this.fetch()
  }

  handleFilter(status) {
    const statusFilter = (status === this.state.statusFilter) ? '' : status
    this.setState({
      statusFilter
    })
  }

  handleStop(appName) {
    const idx = this.state.apps.findIndex(app => app.appName === appName)
    this.setState(state => {
      state.apps[idx].status.applicationState.state = FAILED
      return state
    })
  }

  handleDelete(appName) {
    const idx = this.state.apps.findIndex(app => app.appName === appName)
    return fetch(`${process.env.REACT_APP_API_HOST}/apps/${appName}`, { method: 'DELETE' })
      .then(() => {
        this.setState({
          apps: this.state.apps.slice(0, idx).concat(this.state.apps.slice(idx + 1))
        })
      })
  }

  getAvgRunningTime() {
    let count = 0
    const sum = this.state.apps.reduce((acc, app) => {
      const startM = moment(app.status.lastSubmissionAttemptTime)
      if (!app.status.terminationTime) return acc
      //
      count += 1
      const endM = moment(app.status.terminationTime)
      return acc + endM.diff(startM)
    }, 0)
    if (count === 0) return null
    //
    const duration = sum / count
    return getHumanDuration({ duration })
  }

  render() {
    const nbRunning = this.state.apps.filter(x => x.status.applicationState.state === RUNNING).length
    const avgTime = this.getAvgRunningTime()
    let DOM = (
      <React.Fragment>
        <div className="flex-grid">
          <Metric isLoading={this.state.isLoading} value={nbRunning} type='running-apps' />
          <Metric isLoading={this.state.isLoading} value={avgTime} type='avg-time' />
        </div>
        <div className="flex-grid Controller">
          <Filters isLoading={this.state.isLoading} apps={this.state.apps} onFilter={this.handleFilter} statusFilter={this.state.statusFilter} />
          <Button title="Refresh" icon="RefreshIcon" onClick={this.handleRefresh.bind(this)} />
        </div>
        <div className="table">
          <AppsTable
            isLoading={this.state.isLoading}
            apps={this.state.apps}
            statusFilter={this.state.statusFilter}
            onStop={this.handleStop.bind(this)}
            onDelete={this.handleDelete.bind(this)}
        />
        </div>
      </React.Fragment>
    )
    if (this.state.isLoading) DOM = null
    return (
      <React.Fragment>
        <Loader isLoading={this.state.isLoading} />
        {DOM}
      </React.Fragment>
    )
  }
}