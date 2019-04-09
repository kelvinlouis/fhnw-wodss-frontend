import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import { Actions } from '../../actions';
import ProjectModalForm from '../../components/ProjectModelForm/ProjectModalForm';
import { showProjectCreateForm } from '../../actions/form/project-form.actions';
import Button from '../../components/Button/Button';
import { showAllocationCreateForm } from '../../actions/form/allocation-form.actions';
import AllocationModalForm from '../../components/AllocationModalForm/AllocationModalForm';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.project.fetchAll();
  actions.contract.fetchAll();
  actions.allocation.fetchAll();
};

export const Planning: Component<ViewProps> = ({ state, actions }) => {
  return (
    <div oncreate={() => onRender(actions)}>
      <div className="view-container">
        <h1 className="title">Planning</h1>
        <Button
          theme="primary"
          label="Create Project"
          onClick={() => showProjectCreateForm(true, actions)}
        />

        <Button
          theme="primary"
          label="Create Allocation"
          onClick={() => showAllocationCreateForm(true, actions)}
        />
      </div>
      <ProjectModalForm state={state} actions={actions} />
      <AllocationModalForm state={state} actions={actions} />
    </div>
  );
};

export default Planning;
