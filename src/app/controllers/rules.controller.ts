import { Context, dependency, Get, HttpResponseOK, ValidateQueryParam } from '@foal/core';
import { Facts } from '../services/facts';
import { Rule } from '../services/rules';

export class RulesController {

  @dependency
  rule: Rule;

  @dependency
  facts: Facts;

  @Get('/')
  @ValidateQueryParam('table-name', { type: 'string' })
  async get(ctx: Context) {
    const tableName = ctx.request.query['table-name'];
    //TODO move logic to service layer
    const facts = await this.facts.execute({tableName});
    const res = await this.rule.evaluate(facts)
    return new HttpResponseOK(res);
  }

}
