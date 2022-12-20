import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): TaskModel {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): TaskModel {
    const { title, description } = createTaskDto;

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
