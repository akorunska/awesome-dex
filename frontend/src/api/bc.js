import { TransactionBuilder, Parameter, Transaction } from "ontology-ts-sdk";
import { getBcClient } from "./network";
import { gasPrice, gasLimit, cryptoAddress } from "../utils/blockchain";
import { timeout } from "promise-timeout";
import { notifyTimeout } from "./constants";

export function createTrx({
  funcName,
  params,
  contractAddress,
  accountAddress
}) {
  console.log("create trx", params);
  const paramsTyped = params.map((param, index) => {
    return new Parameter(param.label, param.type, param.value);
  });

  return TransactionBuilder.makeInvokeTransaction(
    funcName,
    paramsTyped,
    cryptoAddress(contractAddress),
    gasPrice,
    gasLimit,
    accountAddress // address of payer
  );
}

export function signTrx(trx, pk, addSign) {
  if (typeof trx === "string") {
    trx = Transaction.deserialize(trx);
  }
  if (addSign) {
    TransactionBuilder.addSign(trx, pk);
  } else {
    TransactionBuilder.signTransaction(trx, pk);
  }
  return trx;
}

export async function sendTrx(trx, preExec = false, waitNotify = false) {
  try {
    const client = getBcClient();
    return await client.sendRawTransaction(
      trx.serialize(),
      preExec,
      waitNotify
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function addSignAndSendTrx(serializedTrx, pk) {
  const signedTrx = signTrx(serializedTrx, pk, true);
  return await timeout(sendTrx(signedTrx, false, true), notifyTimeout);
}
