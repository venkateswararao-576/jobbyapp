import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import CommonRoute from './components/CommonRoute'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <CommonRoute exact path="/" component={Home} />
    <CommonRoute exact path="/jobs" component={Jobs} />
    <CommonRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
