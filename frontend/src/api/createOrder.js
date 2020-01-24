import sha256 from "js-sha256";
import { ontologyExchangeContractSellOnt } from "./constants";
import {
  addSignAndSendTrx,
  sendTrx,
  createTrx,
  deserializePrivateKey
} from "./bc";
import { cryptoAddress } from "../utils/blockchain";

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
      cryptoAddress(ontAddress)
    );
    return await addSignAndSendTrx(
      serializedTrx,
      deserializePrivateKey(ontPrivKey)
    );
  } catch (e) {
    console.log(e);
  }
}

export async function get_initiator(secret, sender) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_initiator";
    const hashlock = getHashlock(secret);
    const args = [{ type: "Hex", value: hashlock }];
    const serializedTrx = await createTrx(operation, args, scriptHash);
    const result = await sendTrx(serializedTrx, true, false);
    // !!parseInt(get(response, "Result.Result", "0"), 16);
    return result;
  } catch (e) {
    console.log(e);
  }
}
