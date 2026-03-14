import { expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

// 1. Beri tahu TypeScript tentang custom matcher kita
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toMatchSchema(schema: object): R;
    }
  }
}

// 2. Logika utama sama persis seperti versi JavaScript
expect.extend({
  toMatchSchema(responseBody: any, schema: object) {
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);

    if (valid) {

      console.log('✅ Schema validation successful!');
      
      return {
        message: () => 'expected response body to match schema',
        pass: true,
      };
    } else {
      const errors = ajv.errorsText(validate.errors, { separator: '\n' });
      return {
        message: () => `Schema validation failed!\n\nErrors:\n${errors}`,
        pass: false,
      };
    }
  },
});


/* import { expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });
const schemaCache = new Map<object, any>();

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toMatchSchema(schema: object): R;
    }
  }
}

expect.extend({
  toMatchSchema(responseBody: unknown, schema: Record<string, any>) {
    try {
      // Gunakan object reference sebagai key
      if (!schemaCache.has(schema)) {
        schemaCache.set(schema, ajv.compile(schema));
      }
      const validate = schemaCache.get(schema);
      
      const valid = validate(responseBody);

      if (valid) {
        return {
          message: () => 'expected response to not match schema',
          pass: true,
        };
      } else {
        const errors = ajv.errorsText(validate.errors, { separator: '\n' });
        const responseStr = JSON.stringify(responseBody, null, 2).substring(0, 500);
        return {
          message: () => `response body does not match schema\n\nErrors:\n${errors}\n\nResponse:\n${responseStr}`,
          pass: false,
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        message: () => `schema validation setup error: ${errorMessage}`,
        pass: false,
      };
    }
  },
}); */