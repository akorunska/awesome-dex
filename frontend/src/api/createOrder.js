import { ontologyExchangeContractSellOnt, ethDecimals } from "./constants";
import { addSignAndSendTrx, createTrx, deserializePrivateKey } from "./bc";
import { cryptoAddress } from "../utils/blockchain";

export async function createOrderSellOnt(
  amountOfOntToSell,
  amountOfEthToBuy,
  hashlock,
  sender
) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "intiate_order";
    const { ontAddress, ontAddressByteArray, ontPrivKey } = sender;
    const args = [
      { type: "Integer", value: amountOfOntToSell },
      { type: "Integer", value: amountOfEthToBuy * ethDecimals },
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
