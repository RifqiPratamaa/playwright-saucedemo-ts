import { test, expect } from '@playwright/test';
/**
 * Jika workspace ini akan digunakan khusus untuk API saja,
 * maka confignya bisa menggunakan seperti ini di file playwright.config.ts:
 * 
import { defineConfig } from '@playwright/test';
    export default defineConfig({
    use: {
        baseURL: 'https://reqres.in/api',
        extraHTTPHeaders: {
        'Content-Type': 'application/json'
        }
    }
    });
 * 
 * Konfigurasi dibawah ini jika dibuat khusus per test file.
 */
// Override konfigurasi hanya untuk file ini
test.use({
  baseURL: 'https://reqres.in',
  extraHTTPHeaders: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres_8fc92b4f96e14e1ea5a63d06e86889b4'
  },
});

    test.describe('API Testing dengan Reqres.in', () => {

        test('GET /users?page=2 – List Users', async ({ request }) => {
          const response = await request.get('/api/users');
          expect(response.status()).toBe(200);
          const body = await response.json();
          expect(Array.isArray(body.data)).toBeTruthy();
          expect(body.data[0]).toMatchObject({
            id: expect.any(Number),
            email: expect.any(String),
          });

          console.log(body)
        });
      
        test('POST /users – Create New User', async ({ request }) => {
          const response = await request.post('/api/users', {
            data: { name: 'morpheus', job: 'leader' }
          });
          // expect(response.status()).toBe(201);
          const body = await response.json();
          expect(body).toMatchObject({
            name: 'morpheus',
            job: 'leader',
            id: expect.any(String),
            createdAt: expect.any(String),
          });
        });
      
        test('PUT /users/2 – Update Existing User', async ({ request }) => {
          // 1. Kirim PUT ke /users/2 dengan payload update
          const response = await request.put('/api/users/2', {
            data: { name: 'morpheus', job: 'zion resident' }
          });
          // 2. Pastikan status 200 OK
          expect(response.status()).toBe(200);
          // 3. Parse JSON body
          const body = await response.json();
          // 4. Response harus mengandung updatedAt
          expect(body).toMatchObject({
            name: 'morpheus',
            job: 'zion resident',
            updatedAt: expect.any(String),
          });
        });
      
        test('DELETE /users/2 – Delete User', async ({ request }) => {
          // 1. Kirim DELETE ke /users/2
          const response = await request.delete('/api/users/2');
          // 2. Pastikan status 204 No Content
          expect(response.status()).toBe(204);
          // 3. Body harus kosong string
          const text = await response.text();
          expect(text).toBe('');
        });
      
      });