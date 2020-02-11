import { RestClient } from "ontology-ts-sdk";
import { ontNodeEndpoint } from "./constants";

const bcRestClient = new RestClient(ontNodeEndpoint);

export function getBcClient() {
  return bcRestClient;
}
