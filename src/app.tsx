import { Component, h, View } from 'hyperapp';
import { Route } from '@hyperapp/router';
import { State } from './state';
import { actions, Actions } from './actions';
import './styles/styles.scss';
import Planning from './views/Planning/Planning';
import Employees from './views/Employees/Employees';
import Login from './views/Login/Login';
import Logout from './views/Logout/Logout';
import { protect } from './views/ProtectedView';
import { EmployeeModel } from './api/dto/employee.model';

export const view: View<State, Actions> = (state, actions) =>  {
  const user = window.localStorage.getItem('user');
  const authenticated = state.user.authenticated;

  // Check in the local storage if the user is already authenticated
  if (!authenticated && user != null) {
    actions.user.setEmployee(new EmployeeModel(JSON.parse(user)));
  }

  return (
    <main>
      <Route path="/planning" render={() => protect(Planning)({ state, actions })} />
      <Route path="/employees" render={() => protect(Employees)({ state, actions })} />
      <Route path="/logout" render={() => protect(Logout)({ state, actions })} />
      <Route path="/" render={() => Login({ state, actions })} />
    </main>
  );
};
