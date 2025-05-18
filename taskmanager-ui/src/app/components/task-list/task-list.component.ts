import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', completed: false };
  editTaskId?: number;
  private backupTask?: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', completed: false };
      this.loadTasks();
    });
  }

  toggleComplete(task: Task) {
  this.taskService.updateTask(task).subscribe(() => this.loadTasks());
}

  deleteTask(id?: number) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  editTask(task: Task) {
    this.editTaskId = task.id;
    this.backupTask = { ...task };
  }

  cancelEdit() {
    if (!this.editTaskId || !this.backupTask) return;

    const index = this.tasks.findIndex(t => t.id === this.editTaskId);
    if (index > -1) {
      this.tasks[index] = this.backupTask;
    }

    this.editTaskId = undefined;
    this.backupTask = undefined;
  }

  saveEdit(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      this.editTaskId = undefined;
      this.backupTask = undefined;
      this.loadTasks();
    });
  }
}
