import React from 'react'
import AppFocusTable from '../components/AppFocusTable'
import AppFocusConfig from '../components/AppFocusConfig'
import AppFocusLog from '../components/AppFocusLog'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

export default class AppFocus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true, app: null, log: '' }
  }

  componentDidMount() {
    this.fetch()
    this.fetchLog()
  }

  fetch() {
    return fetch(`${process.env.REACT_APP_API_HOST}/apps/${this.props.match.params.appName}`)
      .then(response => {
        if (response.ok) return response.json()
        else throw new Error(response.statusText)
      })
      .then(data => {
        this.setState({
          isLoading: false,
          app: data
        })
      }, error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  fetchLog() {
    return fetch(`${process.env.REACT_APP_API_HOST}/apps/${this.props.match.params.appName}/log`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          log: data.content
        })
      })
  }

  handleRefresh() {
    this.setState({
      isLoading: true,
      app: null
    })
    this.fetch()
  }

  render() {
    return (
      <React.Fragment>
        <Loader isLoading={this.state.isLoading} />
        <AppFocusTable isLoading={this.state.isLoading} app={this.state.app} />
        <AppFocusConfig isLoading={this.state.isLoading} app={this.state.app} />
        <AppFocusLog isLoading={this.state.isLoading} log={this.state.log} />
        <NotFound isLoading={this.state.isLoading} isData={!!this.state.app} />
      </React.Fragment>
    )
  }
}