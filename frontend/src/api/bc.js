import {
  TransactionBuilder,
  Parameter,
  Transaction,
  Crypto
} from "ontology-ts-sdk";
import { Reader } from "ontology-ts-crypto";
import { getBcClient } from "./network";
import { gasPrice, gasLimit, cryptoAddress } from "../utils/blockchain";
import { timeout } from "promise-timeout";
import { notifyTimeout } from "./constants";

const PrivateKey = Crypto.PrivateKey;
const KeyParameters = Crypto.KeyParameters;
const KeyType = Crypto.KeyType;
const CurveLabel = Crypto.CurveLabel;

export function deserializePrivateKey(str) {
  const b = new Buffer(str, "hex");
  const r = new Reader(b);

  if (b.length === 32) {
    // ECDSA
    const algorithm = KeyType.ECDSA;
    const curve = CurveLabel.SECP256R1;
    const sk = r.readBytes(32);
    return new PrivateKey(
      sk.toString("hex"),
      algorithm,
      new KeyParameters(curve)
    );
  } else {
    const algorithmHex = r.readByte();
    const curveHex = r.readByte();
    const sk = r.readBytes(32);

    return new PrivateKey(
      sk.toString("hex"),
      KeyType.fromHex(algorithmHex),
      new KeyParameters(CurveLabel.fromHex(curveHex))
    );
  }
}

export async function createTrx(
  funcName,
  params,
  contractAddress,
  accountAddress
) {
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
