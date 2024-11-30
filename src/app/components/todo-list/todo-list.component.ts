import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="space-y-2">
      @for (todo of todoService.todos(); track todo.id) {
        <li
          class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          [class.line-through]="todo.completed"
        >
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo(todo)"
              class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{{ todo.text }}</span>
          </div>
          
          <button
            (click)="deleteTodo(todo)"
            class="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      } @empty {
        <li class="text-center text-gray-500 py-4">
          No todos yet! Add one above.
        </li>
      }
    </ul>
    <div class="mt-4" *ngIf="todoService.completedCount() > 0">
      <button
        (click)="todoService.clearCompleted()"
        class="text-sm text-blue-600 hover:text-blue-800"
      >
        Clear completed
      </button>
    </div>
  `
})
export class TodoListComponent {
  constructor(public todoService: TodoService) {}

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo.id);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
}