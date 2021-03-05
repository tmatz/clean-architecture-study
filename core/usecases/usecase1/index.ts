import type { Domain } from "@core/entities/domain";

export interface IUsecase1 {
  getDomainName(): string;
}

class Usecase1 implements IUsecase1 {
  readonly domain: Domain;

  constructor(domain: Domain) {
    this.domain = domain;
  }

  getDomainName(): string {
    return this.domain.name;
  }
}

export function createUsecase1(domain: Domain) {
  return new Usecase1(domain);
}
