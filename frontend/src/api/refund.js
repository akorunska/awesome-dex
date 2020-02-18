import {
  ontologyExchangeContractSellOnt,
  ethereumExchangeContractSellOnt,
  ethContractJsonInterface,
  ethGasLimit
} from "./constants";
import { addSignAndSendTrx, createTrx, deserializePrivateKey } from "./bc";
import { cryptoAddress } from "../utils/blockchain";

import Web3 from "web3";
const Tx = require("ethereumjs-tx").Transaction;

let web3 = new Web3(Web3.givenProvider);

const exchangeContract = new web3.eth.Contract(
  ethContractJsonInterface,
  ethereumExchangeContractSellOnt
);

export async function refundOnt(hashlock, sender) {
  const scriptHash = ontologyExchangeContractSellOnt;
  const operation = "refund";
  const { ontAddress, ontPrivKey } = sender;
  const args = [{ type: "Hex", value: hashlock }];
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
}

export async function refundEth(hashlock, sender) {
  const refundEth = exchangeContract.methods.refundEth(hashlock);
  const encodedABI = refundEth.encodeABI();
  const currentGasPrice = parseInt(await web3.eth.getGasPrice());
  const txCount = await web3.eth.getTransactionCount(sender.ethAddress);
  const rawTx = {
    nonce: "0x" + txCount.toString(16),
    from: sender.ethAddress,
    to: ethereumExchangeContractSellOnt,
    gas: "0x" + ethGasLimit.toString(16),
    gasPrice: "0x" + currentGasPrice.toString(16),
    data: encodedABI
  };
  const tx = new Tx(rawTx, { chain: "ropsten" });
  const privateKey = new Buffer(sender.ethPrivKey, "hex");
  tx.sign(privateKey);
  const serializedTx = tx.serialize();
  const result = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );

  return result;
}
