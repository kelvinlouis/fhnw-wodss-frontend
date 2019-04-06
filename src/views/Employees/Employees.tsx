import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import Button from '../../components/Button/Button';
import EmployeeModalForm from '../../components/EmployeeModalForm/EmployeeModalForm';]
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import { Actions } from '../../actions';

const showForm: (show: boolean, actions: Actions) => void = (show, actions) => {
  actions.form.updateField({
    formName: 'employee',
    fieldName: 'isOpen',
    value: show,
  });
};

export const Employees: Component<ViewProps> = ({ state, actions }) => {
  const employee = state.user.employee!;

  return (
    <div oncreate={() => actions.employee.fetchAll()}>
      <div className="employees-container">
        <h1 className="title">Employees {employee.firstName}!</h1>
        {state.employee.isLoading && <div className="is-loading">Loading...</div>}
        <EmployeeList state={state.employee} actions={actions} />
        <Button theme="primary" label="Create" onClick={() => showForm(true, actions)} />
      </div>
      <EmployeeModalForm state={state.form} actions={actions} />
    </div>
  );
};

export default Employees;
