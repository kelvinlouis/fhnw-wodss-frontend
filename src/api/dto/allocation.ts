import { Moment } from 'moment';

/**
 * Represents the work unit an employee is doing for a project
 * @export
 * @interface Allocation
 */
export interface Allocation {
  /**
   * Allocation ID
   * @type {string}
   * @memberof Allocation
   */
  id?: string;
  /**
   * Allocation start date (YYYY-MM-DD)
   * @type {string}
   * @memberof Allocation
   */
  startDate: string | Moment;
  /**
   * Allocation end date (YYYY-MM-DD)
   * @type {string}
   * @memberof Allocation
   */
  endDate: string | Moment;
  /**
   * Full time equivalent for the contract as percentage value (0.5 FTE = 50)
   * @type {number}
   * @memberof Allocation
   */
  pensumPercentage: number;
  /**
   * Contract ID of the allocation
   * @type {string}
   * @memberof Allocation
   */
  contractId: string;
  /**
   * Project ID of the allocation
   * @type {string}
   * @memberof Allocation
   */
  projectId: string;
}
