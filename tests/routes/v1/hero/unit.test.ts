
import {
    idHero,
    heroMock,
    mockHeroCreate,
    mockHeroUpdate,
    mockHeroFind,
    mockHeroGet,
    mockHeroDelete,
} from './mock';

import supertest from 'supertest';
import app from '../../../../src/app';

/***********************    CREATE   ************************/

describe('Create Hero...', () => {
    beforeEach(() => {
        mockHeroCreate.mockClear();
    });

    const request = supertest(app);
    const endpoint = '/v1/hero';

    it('fail save hero, data required', async () => {
        const response = await request.post(endpoint).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/required/);
        expect(mockHeroCreate).not.toBeCalled();
    });

    it('save hero successfully', async () => {
        const response = await request.post(endpoint).send(
            {id: idHero, ...heroMock }
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("success");
        expect(mockHeroCreate).toBeCalled();
    });

});


/***********************    UPDATE   ************************/

describe('Update Hero...', () => {
    beforeEach(() => {
        mockHeroUpdate.mockClear();
    });

    const request = supertest(app);
    const endpoint = '/v1/hero';

    it('fail update hero, data required', async () => {
        const response = await request.put(endpoint).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/required/);
        expect(mockHeroUpdate).not.toBeCalled();
    });

    it('update hero successfully', async () => {
        const response = await request.put(endpoint).send(
            {id: idHero, ...heroMock }
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("success");
        expect(mockHeroUpdate).toBeCalled();
    });

});

/***********************    FIND   ************************/

describe('Find Hero...', () => {
    beforeEach(() => {
        mockHeroFind.mockClear();
    });

    const request = supertest(app);
    const endpoint = '/v1/hero/id/';

    it('find hero successfully', async () => {
        const response = await request.get(endpoint + idHero);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("success");
        expect(mockHeroFind).toBeCalled();
    });

});

/***********************    GET   ************************/

describe('Get Heroes...', () => {
    beforeEach(() => {
        mockHeroGet.mockClear();
    });

    const request = supertest(app);
    const endpoint = '/v1/hero';

    it('find all hero successfully', async () => {
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("success");
        expect(mockHeroGet).toBeCalled();
    });

});


/***********************    DELETE   ************************/

describe('Delete Hero...', () => {
    beforeEach(() => {
        mockHeroDelete.mockClear();
    });

    const request = supertest(app);
    const endpoint = '/v1/hero/id/';

    it('delete hero successfully', async () => {
        const response = await request.delete(endpoint + idHero);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("success");
        expect(mockHeroDelete).toBeCalled();
    });

});