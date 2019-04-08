import { ActionResult, ActionsType } from 'hyperapp';
import { FormControl, BaseFormState } from '../../state/form/types';
import { hasProp } from '../../utils';
import { AuthenticationFormState } from '../../state/form/authentication-form.state';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import { FormState } from '../../state/form';
import { employeeFormActions } from './employee-form.actions';
import { authenticationFormActions } from './authentication-form.actions';
import { ProjectFormState } from '../../state/form/project-form.state';
import { projectFormActions } from './project-form.actions';

export interface GenericFormActions<S> {
  patch: (newValues: {[key: string]: any}) => (state: S) => ActionResult<S>;
  updateValue: (control: FormControl<any>) => (state: S) => ActionResult<S>;
  reset: () => (state: S) => ActionResult<S>;
  setSaving: (isSaving: boolean) => (state: S) => ActionResult<S>;
  setOpen: (isOpen: boolean) => (state: S) => ActionResult<S>;
}

export const setSaving = (isSaving: boolean, state: BaseFormState): BaseFormState => ({
  ...state,
  isSaving,
});

export const setOpen = (isOpen: boolean, state: BaseFormState): BaseFormState => ({
  ...state,
  isOpen,
});

export const updateValue = (control: FormControl<any>, state: BaseFormState): BaseFormState => {
  if (!hasProp(state.controls, control.name)) {
    throw new Error(`There is no '${control.name}' in form available.`);
  }

  return {
    ...state,
    controls: {
      ...state.controls,
      [control.name]: {
        ...state.controls[control.name],
        value: control.value,
      },
    },
  };
};

export const patch = (values: {[key: string]: any}, state: BaseFormState): BaseFormState => {
  const newValues = { ...values };

  Object
    .keys(newValues)
    .forEach((key) => {
      newValues[key] = {
        ...state.controls[key],
        value: newValues[key],
      };
    });

  return {
    ...state,
    controls: {
      ...state.controls,
      ...newValues,
    },
  };
};

export interface FormActions {
  authentication: GenericFormActions<AuthenticationFormState>;
  employee: GenericFormActions<EmployeeFormState>;
  project: GenericFormActions<ProjectFormState>;
}

export const formActions: ActionsType<FormState, FormActions> = {
  authentication: authenticationFormActions,
  employee: employeeFormActions,
  project: projectFormActions,
};
