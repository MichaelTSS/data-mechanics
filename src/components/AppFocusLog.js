import React from 'react'

export default function AppFocusLog(props) {
  if (props.isLoading) return null
  if (!props.log) return null
  //
  const lines = props.log.split('\n').map((line, idx) => <p key={idx}>{line}</p>)
  return (
    <div className="container">
      <h3>Logs</h3>
      <div className="Codeblock">
        {lines}
      </div>
    </div>
  )
}