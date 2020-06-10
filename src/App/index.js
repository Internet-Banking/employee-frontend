import React from 'react'
import LoginPage from '../views/Login'
import {useSelector, useDispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import ErrorPage from '../views/ErrorPage'
import UserPage from '../views/UserPage'
import {initApp} from './actions'
import {Layout} from '../components'

const App = () => {
  const token = useSelector(state => state.employee.token)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(initApp())
  })
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => token ? <Redirect to='/user'/> : <LoginPage />}
      />
      <Layout>
        <Route
          path='/user'
          render={() => token ? <UserPage/> : <Redirect to='/'/>} />
      </Layout>
      <Route path='/404' component={ErrorPage} />
      <Redirect from='*' to='/404' />
    </Switch>
  )
}

export default App
