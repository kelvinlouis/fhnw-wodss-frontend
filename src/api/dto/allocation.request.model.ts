import { Allocation } from './allocation';
import { AllocationModel } from './allocation.model';
import { DATE_FORMAT_STRING } from '../../constants';

export class AllocationRequestModel implements Allocation {
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly pensumPercentage: number;
  public readonly contractId: number;
  public readonly projectId: number;

  constructor(allocation: AllocationModel) {
    if (allocation.startDate) {
      this.startDate = allocation.startDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (allocation.endDate) {
      this.endDate = allocation.endDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (allocation.pensumPercentage) {
      this.pensumPercentage = allocation.pensumPercentage;
    } else {
      throw new Error(`The field 'pensumPercentage' is missing.`);
    }

    if (allocation.contractId) {
      this.contractId = allocation.contractId;
    } else {
      throw new Error(`The field 'contractId' is missing.`);
    }

    if (allocation.projectId) {
      this.projectId = allocation.projectId;
    } else {
      throw new Error(`The field 'projectId' is missing.`);
    }
  }
}
