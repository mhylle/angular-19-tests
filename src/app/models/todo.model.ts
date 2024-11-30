export enum TodoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  completedAt?: number; // Timestamp for when the todo was completed
}