import {
  ethereumExchangeContractSellOnt,
  ethContractJsonInterface,
  ethDecimals,
  ethGasLimit
} from "./constants";
import Web3 from "web3";
const Tx = require("ethereumjs-tx").Transaction;

let web3 = new Web3(Web3.givenProvider);

const exchangeContract = new web3.eth.Contract(
  ethContractJsonInterface,
  ethereumExchangeContractSellOnt
);

export async function respondToOrderBuyOnt(
  hashlock,
  amountOfEthToLock,
  sender
) {
  const respondToOrder = exchangeContract.methods.respondToOrder(hashlock);
  const encodedABI = respondToOrder.encodeABI();
  const currentGasPrice = parseInt(await web3.eth.getGasPrice());
  const txCount = await web3.eth.getTransactionCount(sender.ethAddress);
  const rawTx = {
    nonce: "0x" + txCount.toString(16),
    from: sender.ethAddress,
    to: ethereumExchangeContractSellOnt,
    gas: "0x" + ethGasLimit.toString(16),
    gasPrice: "0x" + currentGasPrice.toString(16),
    data: encodedABI,
    value: "0x" + (amountOfEthToLock * ethDecimals).toString(16)
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
