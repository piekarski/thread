import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
  success,
  failure
} from "./libs/response-lib";
export async function main(event, context, callback) {
  const params = {
    TableName: "answers",
    // 'Key' defines the partition key and sort key of the item to beretrieved

    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      answerId: event.pathParameters.id
    }
  };
  console.log('params', params);
  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({
        status: false,
        error: "Answer not found."
      }));
    }
  } catch (e) {
    console.log('error', e);
    callback(null, failure({
      status: false
    }));
  }
}
