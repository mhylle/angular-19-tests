import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent, TodoInputComponent],
  template: `
    <main class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Angular 19 Todo App</h1>
      
      <app-todo-input />
      
      <app-todo-list />
      
      <div class="mt-4 text-sm text-gray-600">
        <div>Total todos: {{ todoService.todoCount() }}</div>
        <div>Completed: {{ todoService.completedCount() }}</div>
        <div>Remaining: {{ todoService.remainingCount() }}</div>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  constructor(public todoService: TodoService) {}
}