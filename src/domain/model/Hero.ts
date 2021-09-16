import generateId from "../../utils/idGenerator";
import Company from "./Company";

export interface Hero {
    id: number;
    name: string;
    alias: string;
    species: string;
    company: Company;
}

export const entity = {
    TableName : "hero"
}

export const put = (request : Hero) => {
    return {
        ...entity,
        Key: {
            id: request.id,
        },
        UpdateExpression: 'set #name = :r, alias = :i, species = :j, company = :k',
        ExpressionAttributeValues: {
            ':r': request.name,
            ':i': request.alias,
            ':j': request.species,
            ':k': request.company
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ReturnValues: 'ALL_NEW'
    }
};

export const get = (id : string | number) => {
    return {
        ...entity,
        Key: {
            id: id,
        }
    }
};

export class ModelHero {
    TableName = entity.TableName;
    ReturnValues = "NONE";

    constructor(public Item : Hero) {
        Item.id = Item.id ? Item.id : generateId();
    }
}
