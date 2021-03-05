import { getDomain } from '@core/entities/domain';
import { createUsecaseTodo } from '@core/usecases/usecase-todo';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './App';
import './index.css';
import { ServiceLocator, ServiceLocatorContext } from './service-locator';

const domain = getDomain();
const usecase1 = createUsecaseTodo(domain);

const serviceLocator: ServiceLocator = {
  domain,
  usecase1,
};

ReactDOM.render(
  <React.StrictMode>
    <ServiceLocatorContext.Provider value={serviceLocator}>
      <AppContainer />
    </ServiceLocatorContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
