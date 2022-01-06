// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { FactsController } from './facts.controller';

describe('FactsController', () => {

  let controller: FactsController;

  beforeEach(() => controller = createController(FactsController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(FactsController, 'foo'), 'GET');
      strictEqual(getPath(FactsController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.get(ctx)));
    });

  });

});
