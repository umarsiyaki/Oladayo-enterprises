
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/authActions';
import AdminDashboard from './components/AdminDashboard';
import CashierDashboard from './components/CashierDashboard';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/admin" component={AdminDashboard} />
        <PrivateRoute path="/cashier" component={CashierDashboard} />
        <Redirect to={isAuthenticated ? "/admin" : "/register"} />
      </Switch>
    </Router>
  );
};

export default App;
