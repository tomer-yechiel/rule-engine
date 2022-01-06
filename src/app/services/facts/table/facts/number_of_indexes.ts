const mssql = require('mssql');

export async function numberOfIndexes(context) {
    const { tableName } = context;
    const request = new mssql.Request();
    const res = await request.query(`SELECT count(*) 
    FROM  sys.indexes AS IND
    WHERE object_id = object_ID('${tableName}')
    AND index_id != 0
    `);
    return {
        'number-of-indexes': res.recordset[0][''] // TODO add type for the facts
    }
}