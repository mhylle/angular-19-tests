import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoService } from './services/todo.service';
import { TodoStatus } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent, TodoInputComponent],
  template: `
    <main class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Angular 19 Todo App</h1>
      
      <app-todo-input />
      
      <app-todo-list />
      
      <div class="mt-4 text-sm text-gray-600 space-y-1">
        <div>Total todos: {{ todoService.todoCount() }}</div>
        <div>To Do: {{ todoCount() }}</div>
        <div>In Progress: {{ todoService.inProgressCount() }}</div>
        <div>Completed: {{ todoService.completedCount() }}</div>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoCount = computed(() => 
    this.todoService.todos().filter(t => t.status === TodoStatus.TODO).length
  );

  constructor(public todoService: TodoService) {}
}