import { Injectable, computed, signal } from '@angular/core';
import { Todo, TodoStatus } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageKey = 'todos';
  
  private readonly _todos = signal<Todo[]>(this.loadTodos());
  
  readonly todos = computed(() => {
    const allTodos = this._todos();
    return [
      ...allTodos.filter(t => t.status === TodoStatus.TODO),
      ...allTodos.filter(t => t.status === TodoStatus.IN_PROGRESS),
      ...allTodos.filter(t => t.status === TodoStatus.COMPLETED)
        .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
    ];
  });

  readonly todoCount = computed(() => this._todos().length);
  readonly completedCount = computed(() => 
    this._todos().filter(todo => todo.status === TodoStatus.COMPLETED).length
  );
  readonly remainingCount = computed(() => 
    this._todos().filter(todo => todo.status !== TodoStatus.COMPLETED).length
  );
  readonly inProgressCount = computed(() =>
    this._todos().filter(todo => todo.status === TodoStatus.IN_PROGRESS).length
  );

  private loadTodos(): Todo[] {
    const savedTodos = localStorage.getItem(this.storageKey);
    if (!savedTodos) return [];
    
    // Handle migration of existing todos
    const parsedTodos = JSON.parse(savedTodos);
    return parsedTodos.map((todo: any) => {
      if ('completed' in todo) {
        // Migrate old format to new format
        return {
          ...todo,
          status: todo.completed ? TodoStatus.COMPLETED : TodoStatus.TODO,
          completedAt: todo.completed ? Date.now() : undefined
        };
      }
      return todo;
    });
  }

  private saveTodos(todos: Todo[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      status: TodoStatus.TODO
    };

    const updatedTodos = [...this._todos(), newTodo];
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  updateTodoStatus(id: number, status: TodoStatus) {
    const updatedTodos = this._todos().map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status,
          completedAt: status === TodoStatus.COMPLETED ? Date.now() : undefined
        };
      }
      return todo;
    });
    
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  deleteTodo(id: number) {
    const updatedTodos = this._todos().filter(todo => todo.id !== id);
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  clearCompleted() {
    const updatedTodos = this._todos()
      .filter(todo => todo.status !== TodoStatus.COMPLETED);
    this._todos.set(updatedTodos);
    this.saveTodos(updatedTodos);
  }
}