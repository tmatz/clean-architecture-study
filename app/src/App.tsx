import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import {
  IPresenterTodo,
  usePresenterTodo as usePresenterTodo,
} from './presenters/presenter-todo';
import { withService } from './service-locator';

interface AppProps {
  todo: IPresenterTodo;
}

export function App({ todo }: AppProps) {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Page has been open for <code>{todo.count}</code> seconds.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {todo.getDomainName()}
          </a>
        </p>
        <textarea value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <button
          onClick={(ev) => {
            todo.createItem({ title });
            setId('');
            setTitle('');
          }}
        >
          Add
        </button>
        <button
          onClick={(ev) => {
            todo.updateItem(id, { title });
          }}
        >
          Update
        </button>
        <ul>
          {todo.items.map((item) => (
            <li
              key={item.id}
              data-id={item.id}
              onClick={(ev) => {
                setId(item.id);
                setTitle(item.title);
              }}
            >
              {item.title}
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  todo.deleteItem(item.id);
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export const AppContainer = withService(App, {
  todo: usePresenterTodo,
});

export default AppContainer;
