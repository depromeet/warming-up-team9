export type ScheduleStatus = 'PROCESSING' | 'READY' | 'DONE';

export interface Schedule {
  readonly taskId: string;
  readonly scheduleId: string;
  readonly title: string;
  readonly estimatedHour: number;
  readonly processTimeSec: number;
  readonly state: ScheduleStatus;
}
