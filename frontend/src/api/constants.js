import PrivateKey from "ontology-ts-sdk";

export const ontologyExchangeContractSellOnt =
  "14972f644a4c43a9e097ee55968f877ce799754d";
export const ethereumExchangeContractSellOnt = "";

export const users = {
  alice: {
    name: "alice",
    displayName: "Alice",
    ethAddress: "",
    ethPrivKey: "",
    ontAddress: "AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ",
    ontAddressByteArray: "8f651d459b4f146380dab28e7cfb9d4bb9c3fcd1",
    ontPrivKey:
      "274b0b664d9c1e993c1d62a42f78ba84c379e332aa1d050ce9c1840820acee8b"
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
      displayName: "Check Order Data",
      route: "/order-data"
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
      displayName: "Check Order Data",
      route: "/order-data"
    },
    {
      displayName: "Cancel and refund",
      route: "#"
    }
  ]
};

export const ontNodeEndpoint = "http://" + "127.0.0.1" + ":20334";

export const notifyTimeout = 30000;

export const ethDecimals = 10 ** 8;

// export const ontologyExchangeContractSellEth = "";
// export const ethereumExchangeContractSellEth = "";
