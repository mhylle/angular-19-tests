import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoStatus } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Todo Section -->
      <section>
        <h2 class="text-lg font-semibold mb-2">To Do</h2>
        <ul class="space-y-2">
          @for (todo of todosByStatus(TodoStatus.TODO); track todo.id) {
            <li class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div class="flex items-center gap-2">
                <span>{{ todo.text }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  (click)="updateStatus(todo, TodoStatus.IN_PROGRESS)"
                  class="px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  Start
                </button>
                <button
                  (click)="updateStatus(todo, TodoStatus.COMPLETED)"
                  class="px-2 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Complete
                </button>
                <button
                  (click)="deleteTodo(todo)"
                  class="px-2 py-1 text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          } @empty {
            <li class="text-center text-gray-500 py-2">No todos</li>
          }
        </ul>
      </section>

      <!-- In Progress Section -->
      <section>
        <h2 class="text-lg font-semibold mb-2">In Progress</h2>
        <ul class="space-y-2">
          @for (todo of todosByStatus(TodoStatus.IN_PROGRESS); track todo.id) {
            <li class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg shadow-sm">
              <div class="flex items-center gap-2">
                <span>{{ todo.text }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  (click)="updateStatus(todo, TodoStatus.TODO)"
                  class="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Move Back
                </button>
                <button
                  (click)="updateStatus(todo, TodoStatus.COMPLETED)"
                  class="px-2 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Complete
                </button>
                <button
                  (click)="deleteTodo(todo)"
                  class="px-2 py-1 text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          } @empty {
            <li class="text-center text-gray-500 py-2">No tasks in progress</li>
          }
        </ul>
      </section>

      <!-- Completed Section -->
      <section>
        <h2 class="text-lg font-semibold mb-2">Completed</h2>
        <ul class="space-y-2">
          @for (todo of todosByStatus(TodoStatus.COMPLETED); track todo.id) {
            <li class="flex items-center justify-between p-3 bg-green-50 rounded-lg shadow-sm">
              <div class="flex items-center gap-2">
                <span class="line-through">{{ todo.text }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  (click)="updateStatus(todo, TodoStatus.TODO)"
                  class="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Reopen
                </button>
                <button
                  (click)="deleteTodo(todo)"
                  class="px-2 py-1 text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          } @empty {
            <li class="text-center text-gray-500 py-2">No completed tasks</li>
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
      </section>
    </div>
  `
})
export class TodoListComponent {
  protected readonly TodoStatus = TodoStatus;
  
  constructor(public todoService: TodoService) {}

  todosByStatus = computed(() => {
    return (status: TodoStatus) => 
      this.todoService.todos().filter(todo => todo.status === status);
  });

  updateStatus(todo: Todo, status: TodoStatus) {
    this.todoService.updateTodoStatus(todo.id, status);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
}