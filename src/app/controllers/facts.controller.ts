import { Context, dependency, Get, HttpResponseOK, ValidateQueryParam } from '@foal/core';
import { Facts } from '../services/facts';

export class FactsController {

  @dependency
  facts: Facts;

  @Get('/')
  @ValidateQueryParam('table-name', { type: 'string' })
  async get(ctx: Context) {
    const tableName = ctx.request.query['table-name'];
    const facts = await this.facts.execute({tableName});
    return new HttpResponseOK({'table-name': tableName, ...facts});
  }

}

