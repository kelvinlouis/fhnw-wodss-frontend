import { EmployeeState } from '../state';
import { Employee } from '../api/dto/employee';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { EmployeeModel } from '../api/dto/employee.model';
import { EmployeeFormState } from '../state/form/employee-form.state';
import { RoleEnum } from '../api/role.enum';
import { Actions } from './index';
import { getApiErrorToast, getToastMessage } from '../utils';

export interface EmployeeActions {
  setLoading: (isLoading: boolean) => (state: EmployeeState) => ActionResult<EmployeeState>;
  fetchAll: () => (state: EmployeeState, actions: EmployeeActions) => Promise<EmployeeModel[]>;
  setList: (employees: EmployeeModel[]) => (state: EmployeeState) => ActionResult<EmployeeState>;
  create: (form: EmployeeFormState) => () => Promise<EmployeeModel>;
  update: (form: EmployeeFormState) => () => Promise<EmployeeModel>;
  delete: (id: number) => () => Promise<void>;
}

export const employeeActions: ActionsType<EmployeeState, EmployeeActions> = {
  setLoading: isLoading => state => (
    Object.assign({}, state, {
      isLoading,
    })
  ),

  setList: employees => state => (
    Object.assign({}, state, {
      list: [...employees],
    })
  ),

  fetchAll: () => (_, actions) => {
    actions.setLoading(true);
    employeeService
      .getAll()
      .then((employees) => {
        actions.setLoading(false);
        actions.setList(employees);
        return employees;
      });
  },

  create: (form: EmployeeFormState) => () => {
    const { emailAddress, firstName, lastName, active, password, role } = form.controls;
    // @TODO VALIDATION

    const employee: Employee = {
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    };

    return employeeService
      .create(employee, password!.value!, (role!.value as RoleEnum))
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },

  update: (form: EmployeeFormState) => () => {
    const { id, emailAddress, firstName, lastName, active } = form.controls;
    // @TODO VALIDATION

    const employee: Employee = {
      id: id.value!,
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    };

    return employeeService
      .update(employee)
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },

  delete: (id: number) => () => {
    return employeeService.delete(id);
  },
};

export const createEmployee = (state: EmployeeFormState, actions: Actions): void => {
  actions
    .employee
    .create(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getToastMessage(`Successfully created employee '${employee.fullName}'.`));

      actions.form.employee.patch({
        ...employee,
      });

      // Refresh underlying view
      actions.employee.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating employee', error));
    });
};

export const updateEmployee = (state: EmployeeFormState, actions: Actions) => {
  actions
    .employee
    .update(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getToastMessage(`Successfully updated employee '${employee.fullName}'.`));

      // Refresh underlying view
      actions.employee.fetchAll();
      actions.form.employee.reset();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error updating employee', error));
    });
};
