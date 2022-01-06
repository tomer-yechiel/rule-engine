import { dependency } from '@foal/core';
import { RuleEngine } from '..';
import { RULES } from './rules/table-rules';

export class Rule {

    @dependency
    ruleEngine: RuleEngine;

    async evaluate(tableFacts) {
        const evalContext = {
            '$': {
                facts: tableFacts
            }
        }
        //TODO get rules as parameter instead of hard coded
        return RULES
        .filter(rule => {
            //TODO assert isActive type is boolean
            return this.ruleEngine.evaluate(rule.isActive ?? 'true', evalContext);
        })
        .map(rule => {
            const isFailed = this.ruleEngine.evaluate(rule.condition, evalContext);
            return { // TODO: split rule evaluation and response formatter
                name: rule.name,
                status: isFailed ? 'Failed' : 'Pass',
                message: this.ruleEngine.evaluate(isFailed ? rule.fm : rule.tm, evalContext)
            }
        });
    }
}

