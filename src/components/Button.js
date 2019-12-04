import React from 'react'
import StopIcon from '@material-ui/icons/Stop'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RefreshIcon from '@material-ui/icons/Refresh'
import Tooltip from '@material-ui/core/Tooltip'


export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(action) {
    this.props.onClick(action)
  }

  render() {
    let icon
    let eventName
    if (this.props.icon === 'StopIcon') {
      icon = <StopIcon />
      eventName = 'stop'
    } else if (this.props.icon === 'DeleteIcon') {
      icon = <DeleteOutlineIcon />
      eventName = 'delete'
    } else if (this.props.icon === 'RefreshIcon') {
      icon = <RefreshIcon />
      eventName = 'refresh'
    }
    const button = <button className="Button" onClick={this.handleClick.bind(this, eventName)}>{icon}</button>
    if (!this.props.title) return button
    //
    return (
      <Tooltip title={this.props.title} arrow>
        {button}
      </Tooltip>
    )
  }
}
