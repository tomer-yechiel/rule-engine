/* eslint-disable @typescript-eslint/no-use-before-define */
const mssql = require('mssql');

export async function primaryKey(context) {
    const { tableName } = context;
    const request = new mssql.Request();
    const res = await request.query(`SELECT CASE
    WHEN Count(index_id) = 1 THEN 'true'
        ELSE 'false'
        END
    FROM sys.indexes 
    WHERE object_id = object_id('${tableName}') 
    AND is_primary_key = 1;
    `);
    const hasPrimaryKey = res.recordset[0][''] === 'true';
    const fact = {
        'has-primary-key': hasPrimaryKey
    };
    if (hasPrimaryKey) {
        const ha = await primaryKeyCount(tableName);
        return { ...fact,  ...ha};
    }
    return fact;
}


async function primaryKeyCount(tableName) {
    const request = new mssql.Request();
    const res = await request.query(`SELECT COUNT(INC.column_id)
    FROM sys.indexes as IND
            INNER JOIN sys.index_columns as INC
                ON IND.object_id = INC.object_id
                AND IND.index_id = INC.index_id
    WHERE IND.object_id = object_id('${tableName}') 
        AND IND.is_primary_key = 1;    
    `);

    return {
        'primary-count-column': res.recordset[0]['']
    }
}