import { dependency } from '@foal/core';
import { DbUtils } from '..';
import { factsFetchers } from './table/index';

export class Facts {

    @dependency
    dbUtils: DbUtils;
    
    async execute(tableName) {
        const isTableExist = await this.dbUtils.isTableExist(tableName);
        if(!isTableExist){
            throw new Error(`table '${tableName}' doesn't exist`);
        }
        let count = 0;
        return (await Promise.all(factsFetchers.map((f,i, arr) => {
            // @ts-ignore
            return f({tableName}).then(fact => {
                count++;
                console.log(`done fact processing ${f.name}, progress=${Math.round(count*100/arr.length)}%`) // use proper logger
                return fact;
            })
            // @ts-ignore
        }))).reduce((prev, cur) => ({ ...prev, ...cur }), {}); // TODO write simpler
    }
}
