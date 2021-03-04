import type { IUsecase1 } from '@app/usecases/usecase1';
import { useServiceLocator } from '../../service-locator';

export function useUsecase1(): IUsecase1 {
  return useServiceLocator<IUsecase1>('usecase1');
}
