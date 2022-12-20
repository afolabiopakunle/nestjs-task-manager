import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksController } from './tasks.controller';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): TaskModel[] {
    const { status, searchTerm } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (searchTerm) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(searchTerm) ||
          task.description.includes(searchTerm),
      );
    }
    return tasks;
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

  updateTask(id: string, status: TaskStatus): TaskModel {
    const task = this.tasks.find((task: TaskModel) => task.id === id);
    task.status = status;
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task: TaskModel) => task.id !== id);
  }
}
