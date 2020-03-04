import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

export const checkBalanceEthereum = async addr => {
  return web3.utils.fromWei(await web3.eth.getBalance(addr));
};
