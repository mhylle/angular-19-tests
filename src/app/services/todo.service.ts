import { Injectable, computed, signal } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageKey = 'todos';
  
  private readonly _todos = signal<Todo[]>(this.loadTodos());
  
  readonly todos = this._todos.asReadonly();
  readonly todoCount = computed(() => this._todos().length);
  readonly completedCount = computed(() => 
    this._todos().filter(todo => todo.completed).length
  );
  readonly remainingCount = computed(() => 
    this._todos().filter(todo => !todo.completed).length
  );

  private loadTodos(): Todo[] {
    const savedTodos = localStorage.getItem(this.storageKey);
    return savedTodos ? JSON.parse(savedTodos) : [];
  }

  private saveTodos(todos: Todo[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };

    const updatedTodos = [...this._todos(), newTodo];
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  toggleTodo(id: number) {
    const updatedTodos = this._todos().map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  deleteTodo(id: number) {
    const updatedTodos = this._todos().filter(todo => todo.id !== id);
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  clearCompleted() {
    const updatedTodos = this._todos().filter(todo => !todo.completed);
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }
}