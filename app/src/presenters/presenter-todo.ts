import type { IUsecaseTodo } from '@core/usecases/usecase-todo';
import { useEffect, useState } from 'react';
import { useUsecaseTodo } from '../hooks/usecases/use-usecase-todo';

export type Id = string;
export type TodoItem = {
  id: Id;
  title: string;
};

type TodoState = {
  items: TodoItem[];
  id: number;
};

export type IPresenterTodo = {
  readonly count: number;
  getDomainName(): string;
  readonly items: TodoItem[];
  createItem(item: { title: string }): Promise<Id>;
  updateItem(id: Id, item: { title: string }): Promise<void>;
  deleteItem(id: Id): Promise<void>;
};

class PresenterTodo implements IPresenterTodo {
  readonly count: number;
  private readonly todoState: TodoState;
  private readonly usecase1: IUsecaseTodo;
  private readonly setTodoState: (state: TodoState) => void;

  constructor(
    count: number,
    todoState: TodoState,
    setTodoState: (state: TodoState) => void,
    usecase1: IUsecaseTodo
  ) {
    this.count = count;
    this.todoState = todoState;
    this.setTodoState = setTodoState;
    this.usecase1 = usecase1;
  }

  getDomainName() {
    return this.usecase1.getDomainName();
  }

  get items() {
    return this.todoState.items;
  }

  createItem(item: { title: string }): Promise<Id> {
    const id = this.todoState.id + 1;
    const items = [...this.todoState.items, { ...item, id: id.toString() }];
    this.setTodoState({ id, items });
    return Promise.resolve(id.toString());
  }

  updateItem(id: Id, { title }: { title: string }): Promise<void> {
    const items = this.todoState.items.map((item) => {
      if (item.id === id) {
        return { ...item, title };
      } else {
        return item;
      }
    });
    this.setTodoState({ id: this.todoState.id, items });
    return Promise.resolve();
  }

  deleteItem(id: string): Promise<void> {
    const items = this.todoState.items.filter((item) => item.id !== id);
    this.setTodoState({ id: this.todoState.id, items });
    return Promise.resolve();
  }
}

export const usePresenterTodo = (): IPresenterTodo => {
  const usecaseTodo = useUsecaseTodo();
  const [count, setCount] = useState(0);
  const [todoState, setTodoState] = useState<TodoState>({
    id: 2,
    items: [
      { id: '1', title: 'Title 1' },
      { id: '2', title: 'Title 2' },
    ],
  });
  useEffect(() => {
    const handle = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(handle);
  }, []);
  return new PresenterTodo(count, todoState, setTodoState, usecaseTodo);
};
