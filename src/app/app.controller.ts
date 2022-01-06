import { controller, IAppController } from '@foal/core';
const mssql = require('mssql')

import { FactsController, RulesController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/facts', FactsController),
    controller('/rules', RulesController),
  ];

  async init() {
    await mssql.connect('REPLACE_ME_WITH_CONNECTION_STRING')
  }
}
