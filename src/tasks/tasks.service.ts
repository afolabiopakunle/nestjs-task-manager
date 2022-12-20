import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string): TaskModel {
    const task: TaskModel = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: randomUUID(),
    };

    this.tasks.push(task);
    return task;
  }
}
