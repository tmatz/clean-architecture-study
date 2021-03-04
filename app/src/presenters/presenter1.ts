import type { IUsecase1 } from '@app/usecases/usecase1';
import { useEffect, useMemo, useState } from 'react';
import { useUsecase1 } from '../hooks/usecases/use-usecase-1';

export type IPresenter1 = {
  readonly count: number;
  getDomainName(): string;
};

class Presenter1 implements IPresenter1 {
  readonly count: number;
  private readonly usecase1: IUsecase1;

  constructor(count: number, usecase1: IUsecase1) {
    this.count = count;
    this.usecase1 = usecase1;
  }

  getDomainName() {
    return this.usecase1.getDomainName();
  }
}

export const usePresenter1 = (): IPresenter1 => {
  const usecase1 = useUsecase1();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(handle);
  }, []);
  return new Presenter1(count, usecase1);
};
