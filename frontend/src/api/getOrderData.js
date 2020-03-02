import { sendTrx, createTrx } from "./bc";
import { utils } from "ontology-ts-sdk";
import { get } from "lodash";
import Web3 from "web3";
import {
  ethereumExchangeContractSellOnt,
  ontologyExchangeContractSellOnt,
  ethContractJsonInterface,
  ethDecimals
} from "./constants";

let web3 = new Web3(Web3.givenProvider);

const exchangeContract = new web3.eth.Contract(
  ethContractJsonInterface,
  ethereumExchangeContractSellOnt
);

export async function getOrderDataEth(hashlock) {
  let result = await exchangeContract.methods.orderList(hashlock).call();
  result.amountEthLocked = result.amountEthLocked / ethDecimals;
  return result;
}

export async function getOrderDataOnt(hashlock) {
  try {
    const initiator = await getInitiatorOnt(hashlock);
    const buyer = await getBuyerOnt(hashlock);
    const amountOfOntToSell = await getAmountOfOntToSellOnt(hashlock);
    const amountOfEthToBuy = await getAmountOfEthToBuyOnt(hashlock);
    const refundTimelock = await getRefundTimelockOnt(hashlock);

    return {
      initiator: initiator,
      buyer: buyer,
      amountOfOntToSell: amountOfOntToSell,
      amountOfEthToBuy: amountOfEthToBuy,
      refundTimelock: refundTimelock
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getInitiatorOnt(hashlock) {
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
export async function getBuyerOnt(hashlock) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_buyer";
    const args = [{ type: "Hex", value: hashlock }];
    const serializedTrx = await createTrx(operation, args, scriptHash);
    const result = await sendTrx(serializedTrx, true, false);
    return get(result, "Result.Result", "0");
  } catch (e) {
    console.log(e);
  }
}

export async function getAmountOfOntToSellOnt(hashlock) {
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

export async function getAmountOfEthToBuyOnt(hashlock) {
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

export async function getRefundTimelockOnt(hashlock) {
  try {
    const scriptHash = ontologyExchangeContractSellOnt;
    const operation = "get_refund_timelock";
    const args = [{ type: "Hex", value: hashlock }];
    const serializedTrx = await createTrx(operation, args, scriptHash);
    const result = await sendTrx(serializedTrx, true, false);
    const value = get(result, "Result.Result", "0");
    return parseInt(utils.reverseHex(value), 16);
  } catch (e) {
    console.log(e);
  }
}
