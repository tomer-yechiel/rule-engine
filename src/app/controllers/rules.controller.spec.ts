// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { RulesController } from './rules.controller';

describe('RulesController', () => {

  let controller: RulesController;

  beforeEach(() => controller = createController(RulesController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(RulesController, 'foo'), 'GET');
      strictEqual(getPath(RulesController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.get(ctx)));
    });

  });

});
