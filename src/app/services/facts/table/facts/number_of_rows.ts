const mssql = require('mssql');

export async function numberOfRows(context) {
    const { tableName } = context;
    const request = new mssql.Request(); // TODO accept sql client as di instead of hard coded
    const res = await request.query(`SELECT count(*) FROM ${tableName}`); // TODO: not safe regard sql injection
    return {
        'number-of-rows': res.recordset[0]['']
    }
}