import { ethereumExchangeContractSellOnt } from "./constants";
import Web3 from "web3";
// import Tx from "ethereumjs-tx";
const Tx = require("ethereumjs-tx").Transaction;

// const { Transaction } = Tx;

let web3 = new Web3(Web3.givenProvider);

const jsonInterface = [
  {
    constant: false,
    inputs: [
      {
        name: "hashlock",
        type: "bytes32"
      },
      {
        name: "secret",
        type: "string"
      }
    ],
    name: "claimEth",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "hashlock",
        type: "bytes32"
      },
      {
        name: "amountEthToLock",
        type: "uint256"
      }
    ],
    name: "respondToOrder",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "hashlock",
        type: "bytes32"
      }
    ],
    name: "refundEth",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32"
      }
    ],
    name: "orderList",
    outputs: [
      {
        name: "initiatorAddress",
        type: "address"
      },
      {
        name: "buyerAddress",
        type: "address"
      },
      {
        name: "hashlock",
        type: "bytes32"
      },
      {
        name: "amountEthLocked",
        type: "uint256"
      },
      {
        name: "refundTimelock",
        type: "uint256"
      },
      {
        name: "claimTimelock",
        type: "uint256"
      },
      {
        name: "secret",
        type: "string"
      },
      {
        name: "status",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "hashlock",
        type: "bytes32"
      },
      {
        name: "initiatorAddress",
        type: "address"
      }
    ],
    name: "lockIntiatorAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

const exchangeContract = new web3.eth.Contract(
  jsonInterface,
  ethereumExchangeContractSellOnt
);

export async function respondToOrderBuyOnt(
  hashlock,
  amountOfEthToLock,
  sender
) {
  const respondToOrder = exchangeContract.methods.respondToOrder(
    hashlock,
    amountOfEthToLock
  );
  const encodedABI = respondToOrder.encodeABI();
  const rawTx = {
    from: sender.ethAddress,
    to: ethereumExchangeContractSellOnt,
    gas: 2000000,
    data: encodedABI,
    value: "0x00" // todo send eth
  };

  const tx = new Tx(rawTx);
  const privateKey = new Buffer(sender.ethPrivKey, "hex");
  tx.sign(privateKey);
  const serializedTx = tx.serialize();
  const result = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );

  return result;
}
