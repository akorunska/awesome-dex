import { client } from "ontology-dapi";
import sha256 from "js-sha256";
import { ontologyExchangeContractSellOnt } from "./constants";

client.registerClient({});

const decimals = 10 ** 8;

const getHashlock = secret => {
  let hash = sha256.create();
  hash.update(secret);
  const hashHex = hash.hex();
  return hashHex;
};

export async function createOrderSellOnt(
  amountOfOntToSell,
  amountOfEthToBuy,
  secret,
  initiatorAddress
) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "intiate_order";
    const hashlock = getHashlock(secret);

    initiatorAddress = "8f651d459b4f146380dab28e7cfb9d4bb9c3fcd1";

    const args = [
      { type: "Integer", value: amountOfOntToSell },
      { type: "Integer", value: amountOfEthToBuy * decimals },
      { type: "Hex", value: hashlock },
      { type: "ByteArray", value: initiatorAddress }
    ];
    let gasPrice = 0;
    let gasLimit = 300000;
    let result = await client.api.smartContract.invoke({
      scriptHash,
      operation,
      args,
      gasPrice,
      gasLimit
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

export async function get_initiator(secret) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_initiator";
    const hashlock = getHashlock(secret);

    let args = [{ type: "String", value: hashlock }];
    let result = await client.api.smartContract.invokeRead({
      scriptHash,
      operation,
      args
    });
    console.log(result, typeof result, result.length);
  } catch (e) {
    console.log(e);
  }
}
