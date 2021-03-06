import { Component, h } from 'hyperapp';
import { Role, roleList, roleNameMap } from '../../api/role';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import Button from '../Button/Button';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import { Actions } from '../../actions';
import { close } from './EmployeeModalForm';
import ContractForm from '../ContractForm/ContractForm';
import { State } from '../../state';
import { updateEmployee } from '../../actions/form/employee-form.actions';
import FormHint from '../FormHint/FormHint';
import { INPUT_LENGTH_SHORT_MAX, INPUT_LENGTH_LONG_MAX } from '../../constants';

interface Props {
  state: State;
  actions: Actions;
}

const onSubmit = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  updateEmployee(state, actions);
};

export const EmployeeEditForm: Component<Props> = ({ state, actions }) => {
  const formState = state.form.employee;
  const { id, firstName, lastName, emailAddress, role } = formState.controls;
  const { employee: formActions } = actions.form;

  return (
    <form onsubmit={(event: Event) => onSubmit(event, formState, actions)}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Employee</p>
          <button
            className="button"
            type="button"
            aria-label="close"
            onclick={() => close(actions)}
          >
              <span className="icon is-small">
                <i className="fas fa-times"/>
              </span>
          </button>
        </header>
        <section className="modal-card-body">
          <div className="columns">
            <div className="column is-one-third">
              <FormField labelText="First Name" required={true}>
                <FormInput
                  name={firstName.name}
                  value={firstName.value}
                  disabled={formState.isSaving}
                  maxLength={INPUT_LENGTH_SHORT_MAX}
                  type="text"
                  errors={firstName.errors}
                  onInputChange={formActions.updateValue}
                />
                {firstName.errors != null && firstName.errors.required && <FormHint theme="danger" label="Field is required" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              <FormField labelText="Last Name" required={true}>
                <FormInput
                  name={lastName.name}
                  value={lastName.value}
                  disabled={formState.isSaving}
                  maxLength={INPUT_LENGTH_SHORT_MAX}
                  type="text"
                  errors={lastName.errors}
                  onInputChange={formActions.updateValue}
                />
                {lastName.errors != null && lastName.errors.required && <FormHint theme="danger" label="Field is required" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              <FormField labelText="Role" required={true}>
                <FormSelect
                  name={role.name}
                  value={role.value}
                  placeholder="Please select"
                  disabled={true}
                  items={roleList}
                  labeler={(r: Role) => roleNameMap[r]}
                  errors={role.errors}
                  onInputChange={formActions.updateValue}
                />
                {role.errors != null && role.errors.required && <FormHint theme="danger" label="Field is required" />}
              </FormField>
            </div>
          </div>
          <div className="columns">
            <div className="column is-two-third">
              <FormField labelText="Email" required={true}>
                <FormInput
                  name={emailAddress.name}
                  value={emailAddress.value}
                  maxLength={INPUT_LENGTH_LONG_MAX}
                  type="email"
                  errors={emailAddress.errors}
                  onInputChange={formActions.updateValue}
                  disabled={formState.isSaving}
                />
                {emailAddress.errors != null && emailAddress.errors.required && <FormHint theme="danger" label="Field is required" />}
                {emailAddress.errors != null && emailAddress.errors.email && <FormHint theme="danger" label="Email invalid" />}
              </FormField>
            </div>
            <div className="column is-one-third" />
          </div>

          {state.form.contract.list.map((contractForm, index) => <ContractForm key={index} state={contractForm} actions={actions} />)}

          <button
            type="button"
            className="button is-fullwidth"
            onclick={() => actions.form.contract.addEmpty(id.value!)}
          >
            Add Contract
          </button>
        </section>
        <footer className="modal-card-foot">
          <Button
            label="Cancel"
            disabled={formState.isSaving}
            isLoading={formState.isSaving}
            onClick={() => close(actions)}
          />
          <Button
            label="Save"
            disabled={formState.isSaving}
            isLoading={formState.isSaving}
            theme="primary"
            type="submit"
          />
        </footer>
      </div>
    </form>
  );
};

export default EmployeeEditForm;
