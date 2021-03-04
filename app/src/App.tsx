import React from 'react';
import './App.css';
import logo from './logo.svg';
import { IPresenter1, usePresenter1 } from './presenters/presenter1';
import { withService } from './service-locator';

interface AppProps {
  presenter1: IPresenter1;
}

export function App({ presenter1 }: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Page has been open for <code>{presenter1.count}</code> seconds.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {presenter1.getDomainName()}
          </a>
        </p>
      </header>
    </div>
  );
}

export const AppContainer = withService(App, {
  presenter1: usePresenter1,
});

export default AppContainer;
