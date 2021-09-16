
export const hero = {
    TableName: "hero",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "N" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};