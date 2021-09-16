import { environment } from '../../config';

const AWS = require("aws-sdk");
AWS.config.update({
  region: environment
});

export const dynamodb = new AWS.DynamoDB();
export const dynamoclient = new AWS.DynamoDB.DocumentClient({region: environment});