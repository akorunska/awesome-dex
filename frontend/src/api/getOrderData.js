import { ontologyExchangeContractSellOnt, ethDecimals } from "./constants";
import { sendTrx, createTrx } from "./bc";
import { utils } from "ontology-ts-sdk";
import { get } from "lodash";

export async function getOrderDataOnt(hashlock) {
  try {
    const initiator = await getInitiator(hashlock);
    const amountOfOntToSell = await getAmountOfOntToSell(hashlock);
    const amountOfEthToBuy = await getAmountOfEthToBuy(hashlock);

    return {
      initiator: initiator,
      amountOfOntToSell: amountOfOntToSell,
      amountOfEthToBuy: amountOfEthToBuy
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getInitiator(hashlock) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_initiator";
    const args = [{ type: "Hex", value: hashlock }];
    const serializedTrx = await createTrx(operation, args, scriptHash);
    const result = await sendTrx(serializedTrx, true, false);
    return get(result, "Result.Result", "0");
  } catch (e) {
    console.log(e);
  }
}

export async function getAmountOfOntToSell(hashlock) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_amount_of_ont_to_sell";
    const args = [{ type: "Hex", value: hashlock }];
    const serializedTrx = await createTrx(operation, args, scriptHash);
    const result = await sendTrx(serializedTrx, true, false);
    const value = get(result, "Result.Result", "0");
    return parseInt(utils.reverseHex(value), 16);
  } catch (e) {
    console.log(e);
  }
}

export async function getAmountOfEthToBuy(hashlock) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_amount_of_eth_to_buy";
    const args = [{ type: "Hex", value: hashlock }];
    const serializedTrx = await createTrx(operation, args, scriptHash);
    const result = await sendTrx(serializedTrx, true, false);
    const value = get(result, "Result.Result", "0");
    return parseInt(utils.reverseHex(value), 16) / ethDecimals;
  } catch (e) {
    console.log(e);
  }
}
