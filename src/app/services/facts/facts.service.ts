import { factsFetchers } from './table/index';

export class Facts {

    async execute(context) {
        // @ts-ignore
        return (await Promise.all(factsFetchers.map(f => {
            // @ts-ignore
            return f(context).then(facts => {
                console.log(`done fact processing ${f.name}`) // use proper logger
                return facts;
            })
            // @ts-ignore
        }))).reduce((prev, cur) => ({ ...prev, ...cur }), {}); // TODO write simpler
    }
}
