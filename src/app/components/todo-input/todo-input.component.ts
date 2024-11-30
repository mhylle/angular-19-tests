import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="mb-4">
      <input
        #todoInput
        type="text"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a new todo..."
        (keyup.enter)="addTodo(todoInput)"
      />
    </div>
  `
})
export class TodoInputComponent {
  constructor(private todoService: TodoService) {}

  addTodo(input: HTMLInputElement) {
    const value = input.value.trim();
    if (value) {
      this.todoService.addTodo(value);
      input.value = '';
    }
  }
}