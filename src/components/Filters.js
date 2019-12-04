import React from 'react'
import { COMPLETED, RUNNING, PENDING, FAILED } from '../utils'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { statuses: [COMPLETED, RUNNING, PENDING, FAILED] }
  }

  handleClick(status) {
    this.props.onFilter(status)
  }

  getNbApps(status) {
    return this.props.apps.filter(x => x.status.applicationState.state === status).length
  }

  getClass(status) {
    if (this.props.statusFilter === status) return 'Button Button--active'
    return 'Button'
  }

  render() {
    if (this.props.isLoading) {
      return null
    }
    //
    const filters = this.state.statuses.map(status => {
      return <button className={this.getClass(status)} onClick={this.handleClick.bind(this, status)} key={status}>{status.toLowerCase()} <em className="Button__badge">{this.getNbApps(status)}</em></button>
    })
    return (
      <div className="Filters">
        <button className={this.getClass('')} onClick={this.handleClick.bind(this, '')}>All <em className="Button__badge">{this.props.apps.length}</em></button>
        {filters}
      </div>
    )
  }
}