export type ScheduleStatus = 'PROCESSING' | 'READY' | 'STOP' | 'DONE';

export interface Schedule {
  readonly taskId: string;
  readonly scheduleId: string;
  readonly title: string;
  readonly estimatedHour: number;
  readonly processTimeSec: number;
  readonly state: ScheduleStatus;
}
