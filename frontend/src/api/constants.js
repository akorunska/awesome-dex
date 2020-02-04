import PrivateKey from "ontology-ts-sdk";

export const ontologyExchangeContractSellOnt =
  "14972f644a4c43a9e097ee55968f877ce799754d";
export const ethereumExchangeContractSellOnt = "";

export const users = {
  alice: {
    name: "alice",
    displayName: "Alice",
    ethAddress: "0x174315c0039f0160E12FB3AC96A7D18D61B1A714",
    ethPrivKey:
      "c5b7343bec74fdfb7ef17b7b380f3a5967f60231731563c42520ab80797b179a",
    ontAddress: "AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ",
    ontAddressByteArray: "8f651d459b4f146380dab28e7cfb9d4bb9c3fcd1",
    ontPrivKey:
      "274b0b664d9c1e993c1d62a42f78ba84c379e332aa1d050ce9c1840820acee8b"
  },
  bob: {
    name: "bob",
    displayName: "Bob",
    ethAddress: "0x95026e6E2A93283f54774d81B0b5d9892B3Ca3f2",
    ethPrivKey:
      "5e073f33d224bb76ecc158f07e41e05681ef3e3b16b26fe917955942c5fdf23b",
    ontAddress: "",
    ontAddressByteArray: "",
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
