import type { Domain } from '@core/entities/domain';

export interface IUsecaseTodo {
  getDomainName(): string;
}

class UsecaseTodo implements IUsecaseTodo {
  readonly domain: Domain;

  constructor(domain: Domain) {
    this.domain = domain;
  }

  getDomainName(): string {
    return this.domain.name;
  }
}

export function createUsecaseTodo(domain: Domain) {
  return new UsecaseTodo(domain);
}
