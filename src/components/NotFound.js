import React from 'react'

export default function NotFound (props) {
  if (props.isLoading) return null
  if (props.isData) return null
  return <div className="container container--center"><h3>Not Found</h3></div>
}