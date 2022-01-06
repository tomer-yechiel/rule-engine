
// rules evaluate using special DSL
export const RULES: any = [
    {
        name: 'High number of rows',
        condition: '$.facts["number-of-rows"] > 10000000',
        tm: '"The table has a small number of rows (" + $.facts["number-of-rows"] + ")"',
        fm: '"Warning! Large table. The number of rows is " + $.facts["number-of-rows"] + " rows"'
    },
    {
        name: 'A table without a PK',
        condition: '!$.facts["has-primary-key"]',
        tm: '"The table has a Primary Key"',
        fm: '"Warning: the table doesn\'t have a PK"'
    },
    {
        name: 'A PK with a large number of columns',
        isActive: '$.facts["has-primary-key"]',
        condition: '$.facts["primary-count-column"] > 3',
        tm: '"The table has a small number of columns in the PK (" + $.facts["primary-count-column"] + ")"',
        fm: '"Warning! high large number of columns in the PK. Actual value:" + $.facts["primary-count-column"]'
    }
]
