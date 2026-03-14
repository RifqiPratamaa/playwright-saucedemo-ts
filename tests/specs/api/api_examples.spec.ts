import { test, expect } from '@playwright/test';
import '../../api/utils/schemaMatcher';
import getUserSchema from '../../api/schema/getUser.schema.json';
import postUserSchema from '../../api/schema/postUser.schema.json'
import userPayload from '../../api/payloads/postUser.json';

//override test baseURL and add query params header
test.use({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres_8fc92b4f96e14e1ea5a63d06e86889b4'
    },
});

test.describe('API Testing Reqres.in', () => {

    test('GET /users?page=2 – List Users', async ({ request }) => {
        const response = await request.get('/api/users', {
            params: {
                page: 2
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data[0]).toMatchObject({
            id: expect.any(Number),
            email: expect.any(String),
        });
        //JSON Schema Validation
        expect(body).toMatchSchema(getUserSchema);
        console.log(body)
    });


    test('GET /users?page=2 – List Users - 403', async ({ request }) => {
        const response = await request.get('/api/users', {
            headers: {
                'x-api-key': 'reqres_forbidden'
            },
            params: {
                page: 2
            }
        });
        expect(response.status()).toBe(403);
        const body = await response.json();
        expect(body).toMatchObject({
            error: 'invalid_api_key',
            message: expect.any(String),
            hint: expect.any(String)
        });
        console.log(body)
    });


    test('POST /users – Create New User', async ({ request }) => {
        const response = await request.post('/api/users', {
            data: userPayload
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toMatchObject({
            name: userPayload.name,
            job: userPayload.job,
            id: expect.any(String),
            createdAt: expect.any(String),
        });
        //JSON Schema Validation
        expect(body).toMatchSchema(postUserSchema);
        console.log(body)
    });

});