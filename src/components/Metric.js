import React from 'react'

export default function Metric (props) {
  if (props.isLoading) {
    return null
  }
  //
  if (props.type === 'running-apps') {
    return <div>{props.value}&nbsp;currently running apps</div>
  }
  if (props.type === 'avg-time') {
    return <div>{props.value}&nbsp;average time per app</div>
  }
  console.log(`${props.type} is not a supported Metric type`)
  return null
}