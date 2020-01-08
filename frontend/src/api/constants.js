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

// export const ontologyExchangeContractSellEth = "";
// export const ethereumExchangeContractSellEth = "";
