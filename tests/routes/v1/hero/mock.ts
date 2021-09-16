
import { Hero } from '../../../../src/domain/model/Hero';
import generateId from '../../../../src/utils/idGenerator';

jest.unmock("../../../../src/domain/repository/Hero");

export const idHero = generateId();
export const heroMock = {
  name: "Tony Stark",
  alias: "IronMan",
  species: "Human",
  company: {
    name: "Marvel",
    team: "Avengers"
  }
};

export const mockHeroCreate = jest.fn(
  async (hero: Hero): Promise<Hero> => hero
);

export const mockHeroUpdate = jest.fn(
  async (hero: Hero): Promise<Hero> => hero
);

export const mockHeroFind = jest.fn(
  async (id: number): Promise<Hero> => {
    return {
      id: id,
      ...heroMock
    };
  },
);

export const mockHeroGet = jest.fn(
  async (): Promise<[Hero] | []> => {
    return [{
      id: idHero,
      ...heroMock
    }];
  },
);

export const mockHeroDelete = jest.fn(
  async (): Promise<boolean> => true
);

jest.mock("../../../../src/domain/repository/Hero", () => ({
  get create() {
    return mockHeroCreate;
  },
  get update() {
    return mockHeroUpdate;
  },
  get find() {
    return mockHeroFind;
  },
  get get() {
    return mockHeroGet;
  },
  get delete() {
    return mockHeroDelete;
  },
}));
