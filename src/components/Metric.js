import React from 'react'

export default function Metric (props) {
  if (props.isLoading) {
    return null
  }
  //
  let text = ''
  if (props.type === 'running-apps') {
    text = 'currently running apps'
  }
  if (props.type === 'avg-time') {
    text = 'average time per app'
  }
  return (
    <div className="Metric">
      <div className="Metric__value">{props.value}</div>
      <div className="Metric__text">{text}</div>
    </div>
  )
}