// react
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

// styles
import './App.scss'

// home-brewed
import AppsList from './pages/AppsList.js'
import Nav from './layouts/Nav.js'

function MyApp () {
  return <h1>My App</h1>
}

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <header>
          <Nav />
        </header>
        <main className="App-main">
          <Switch>
            <Route exact path="/apps/:appName" component={MyApp} />
            <Route exact path="/apps">
              <AppsList />
            </Route>
            <Route exact path="/">
              <Redirect to="/apps" />
            </Route>
            <Route>
              <Redirect to="/apps/" />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
