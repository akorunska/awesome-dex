import { client } from "ontology-dapi";

export const ontologyExchangeContractSellOnt =
  "4d7599e77c878f9655ee97e0a9434c4a642f9714";
export const ethereumExchangeContractSellOnt = "";

export const users = {
  alice: {
    name: "alice",
    displayName: "Alice",
    ethAddress: "",
    ethPrivKey: "",
    ontAddress: "",
    ontAddressByteArray: "8f651d459b4f146380dab28e7cfb9d4bb9c3fcd1",
    ontPrivKey: ""
  },
  bob: {
    name: "bob",
    displayName: "Bob",
    ethAddress: "",
    ethPrivKey: "",
    ontAddress: "",
    ontPrivKey: ""
  }
};

export const layoutPermissionsByUser = {
  alice: [
    {
      displayName: "Home",
      route: "/"
    },
    {
      displayName: "Create Order",
      route: "/create-order"
    },
    {
      displayName: "Cancel and refund",
      route: "#"
    }
  ],
  bob: [
    {
      displayName: "Home",
      route: "/"
    },
    {
      displayName: "Respond to order",
      route: "/respond-to-order"
    },
    {
      displayName: "Cancel and refund",
      route: "#"
    }
  ]
};

export const ontNodeEndpoint = "https://" + "127.0.0.1" + ":20334";

export const notifyTimeout = 30000;

// export const ontologyExchangeContractSellEth = "";
// export const ethereumExchangeContractSellEth = "";
