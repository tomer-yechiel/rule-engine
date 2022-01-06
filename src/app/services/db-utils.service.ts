const mssql = require('mssql');

export class DbUtils {
    async isTableExist(tableName){
        const request = new mssql.Request();
        const res = await request.query(`IF OBJECT_ID (N'${tableName}', N'U') IS NOT NULL 
        SELECT 1 AS res ELSE SELECT 0 AS res;
        `);
        return res.recordset[0].res === 1;
    }
}
