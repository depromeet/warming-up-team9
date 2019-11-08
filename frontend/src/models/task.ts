export type TaskStatus = 'PENDING' | 'DONE';

export interface Task {
  readonly taskId: string;
  readonly title: string;
  readonly state: TaskStatus;
  readonly processTimeSumSec: number;
}
