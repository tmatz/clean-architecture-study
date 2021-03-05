import type { IUsecaseTodo } from '@core/usecases/usecase-todo';
import { useServiceLocator } from '../../service-locator';

export function useUsecaseTodo(): IUsecaseTodo {
  return useServiceLocator<IUsecaseTodo>('usecase1');
}
