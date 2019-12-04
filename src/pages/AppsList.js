import React from 'react'

import AppsTable from '../components/AppsTable'
import Metric from '../components/Metric'
import Loader from '../components/Loader'
import Filters from '../components/Filters'
import Button from '../components/Button'
import { RUNNING } from '../utils/statuses'

export default class AppsList extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.state = { isLoading: true, apps: [], statusFilter: null }
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
    const statusFilter = (status === this.state.statusFilter) ? null : status
    this.setState({
      statusFilter
    })
  }

  render() {
    const nbRunning = this.state.apps.filter(x => x.status.applicationState.state === RUNNING).length
    const avgTime = '2:45m'
    let DOM = (
      <React.Fragment>
        <div className="flex-grid">
          <Metric isLoading={this.state.isLoading} value={nbRunning} type='running-apps' />
          <Metric isLoading={this.state.isLoading} value={avgTime} type='avg-time' />
        </div>
        <div className="flex-grid Controller">
          <Filters isLoading={this.state.isLoading} apps={this.state.apps} onFilter={this.handleFilter} selectedFilter={this.state.statusFilter} />
          <Button title="Refresh apps" icon="RefreshIcon" onClick={this.handleRefresh.bind(this)} />
        </div>
        <div className="table">
          <AppsTable isLoading={this.state.isLoading} apps={this.state.apps} statusFilter={this.state.statusFilter} />
        </div>
      </React.Fragment>
    )
    if (this.state.isLoading) DOM = null
    return (
      <React.Fragment>
        <div className="container">
          <Loader isLoading={this.state.isLoading} />
        </div>
        {DOM}
      </React.Fragment>
    )
  }
}