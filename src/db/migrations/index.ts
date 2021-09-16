import { dynamodb } from '../connection/';
import { hero } from './hero';
const tables = [hero];

async function run() {
    const currentTables: [any] = await dynamodb.listTables({})
        .promise()
        .then((data: any) => data.TableNames);

    tables.filter((table: any) => !currentTables.includes(table.TableName))
        .forEach((table: any) => {
            dynamodb.createTable(table, function (err: any, data: any) {
                if (err) {
                    console.error("Error JSON.", JSON.stringify(err, null, 2));
                } else {
                    console.log("Created table.", JSON.stringify(data, null, 2));
                }
            });
        })
}

export const migrations = { run };