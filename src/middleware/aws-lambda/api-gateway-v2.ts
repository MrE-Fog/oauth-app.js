import { parseRequest } from "./api-gateway-v2-parse-request";
import { sendResponse } from "./api-gateway-v2-send-response";
import { handleRequest } from "../handle-request";
import type { HandlerOptions } from "../types";
import type { OAuthApp } from "../../index";
import type { ClientType, Options } from "../../types";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

export function createAWSLambdaAPIGatewayV2Handler(
  app: OAuthApp<Options<ClientType>>,
  options: HandlerOptions = {},
) {
  return async function (
    event: APIGatewayProxyEventV2,
  ): Promise<APIGatewayProxyStructuredResultV2 | undefined> {
    const request = parseRequest(event);
    const response = await handleRequest(app, options, request);
    return response ? sendResponse(response) : undefined;
  };
}
