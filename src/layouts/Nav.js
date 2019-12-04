import React from 'react'
import {
  NavLink,
  Switch,
  Route
} from 'react-router-dom'

function Link (props) {
  if (props.match.params.appId) {
    return (
      <React.Fragment>
        <NavLink to="/apps">AppsList</NavLink>
        &nbsp;>&nbsp;
        <NavLink to={`/apps/${props.match.params.appName}`} activeClassName="active">{props.match.params.appId}</NavLink>
      </React.Fragment>
    )
  }
  return <NavLink to="/apps" activeClassName="active">AppsList</NavLink>
}

export default function Nav() {
  return (
    <nav>
      <Switch>
        <Route exact path="/apps" component={Link} />
        <Route exact path="/apps/:appName" component={Link} />
      </Switch>
    </nav>
  )
}
