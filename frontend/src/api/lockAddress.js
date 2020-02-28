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

export async function lockBuyerAddress(
  hashlock,
  buyerAddressByteArray,
  sender
) {
  const scriptHash = ontologyExchangeContractSellOnt;
  const operation = "set_buyer_address";
  const { ontAddress, ontPrivKey } = sender;
  const args = [
    { type: "Hex", value: hashlock },
    { type: "ByteArray", value: buyerAddressByteArray }
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
}

export async function lockIntiatorAddress(hashlock, initiatorAddress, sender) {
  const lockInitiatorAddress = exchangeContract.methods.lockIntiatorAddress(
    hashlock,
    initiatorAddress
  );
  const encodedABI = lockInitiatorAddress.encodeABI();
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
