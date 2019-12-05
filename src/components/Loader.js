import React from 'react'
import Spinner from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export default class Loader extends React.Component {
  render() {
    if (!this.props.isLoading) return null
    //
    return (
      <div className="container container--center"><h3>
        <Spinner
          type="TailSpin"
          color="#282c34"
          height={40}
          width={100}
        /></h3>
      </div>
    )
  }
}