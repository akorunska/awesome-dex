import { client } from "ontology-dapi";
import sha256 from "js-sha256";
import { ontologyExchangeContractSellOnt } from "./constants";
import { addSignAndSendTrx, createTrx } from "./bc";

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
  sender
) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "intiate_order";
    const hashlock = getHashlock(secret);
    const { ontAddress, ontAddressByteArray, ontPrivKey } = sender;

    const args = [
      { type: "Integer", value: amountOfOntToSell },
      { type: "Integer", value: amountOfEthToBuy * decimals },
      { type: "Hex", value: hashlock },
      { type: "ByteArray", value: ontAddressByteArray }
    ];

    const serializedTrx = await createTrx(
      operation,
      args,
      scriptHash,
      ontAddress
    );

    return await addSignAndSendTrx(serializedTrx, ontPrivKey);
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
