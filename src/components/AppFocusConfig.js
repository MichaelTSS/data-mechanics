import React from 'react'
import { JSONViewer } from 'react-json-editor-viewer'

export default function AppFocusConfig (props) {
  if (props.isLoading) return null
  if (!props.app) return null
  //
  return (
    <div className="container">
      <h3>Config</h3>
      <div className="Codeblock">
        <JSONViewer data={props.app.config} />
      </div>
    </div>
  )
}