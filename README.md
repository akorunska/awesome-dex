# awesome-dex

This is a demo prototype, that aims to showcase how Atomic Swaps can be used to build a DEX. 

The project consists of several parts:
* `/contracts/ontology` folder contains Ontology SC and unit tests for it
* `/contracts/ethereum` folder contains Ethereum SC
* `/frontend` folder contains simple frontend, that allows interacting with smart contracts mentioned above

## About the demo

#### Notes

Frontend demo is not a fully-functional DEX, but rather a way to facilitate interaction with smart contracts in order to see, 
how atomic swaps work. 

Prototype interacts with Ontology SC 
(deployed to Ontology testnet on `14972f644a4c43a9e097ee55968f877ce799754d`)
and Ethereum SC (deployed to Ropsten testnet on `0x6ad25cb063bc6ebbc7a0ed66cbb91aa4c7fad86e`).

We've got 2 hardcoded users: Alice and Bob. Alice wants to sell some amount of ONT for ETH, and Bob wants to exchange his ETH to ONT.
Private keys and addresses are located on `frontend/src/api/constants` in `users` object.
Please, note, that you can use that users, but keep in mind, that they are not guaranteed to have sufficient balance of ETH and/or ONT.
You are welcome to recharge those wallets, but it would be best to replace hardcoded data with your own test accounts.

#### Workflow instruction

To initiate exchange switch to Alice and to go *Create Order* page.

Hashlock b9d2195fbd4b7a5812498d380b2275e4eb8b939920cc74288fa688f6e0849c93
Secret 97feb4ac885c56dd4bbb454fc1dbb0175e5fe5e66e123d394e83bd357a2d04cf569298d625cbc9799a5db2296e912448



Example of a completed hashlock: f6bfc781982d1cdd1abd116124a68a94c64bda7608b93a6da7cbd3b29076f987

https://ropsten.etherscan.io/address/0x6ad25cb063bc6ebbc7a0ed66cbb91aa4c7fad86e
