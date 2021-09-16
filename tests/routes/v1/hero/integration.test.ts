jest.resetAllMocks();

import supertest from 'supertest';
import app from '../../../../src/app';
import HeroRepository from '../../../../src/domain/repository/Hero';
import { heroMock } from './mock';

export const heroCreateSpy = jest.spyOn(HeroRepository, 'create');

describe('Hero save', () => {

    const request = supertest(app);
    const endpoint = '/v1/hero';

    beforeEach(() => {
        heroCreateSpy.mockClear();
    });

    it('Should send error when empty body is sent', async () => {
        const response = await request.post(endpoint);
        expect(response.status).toBe(400);
        expect(heroCreateSpy).not.toBeCalled();
    });

    it('Should send error when company it is not an object', async () => {
        const response = await request.post(endpoint).send({...heroMock, company: ""});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/must be of type object/);
        expect(heroCreateSpy).not.toBeCalled();
    });

});