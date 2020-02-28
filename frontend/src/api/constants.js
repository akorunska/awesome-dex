export const ontologyExchangeContractSellOnt =
  "14972f644a4c43a9e097ee55968f877ce799754d";
export const ethereumExchangeContractSellOnt =
  "0x63ec7373b680a630a1852f0567442e05a6200fcb";

export const users = {
  alice: {
    name: "alice",
    displayName: "Alice",
    ethAddress: "0x174315c0039f0160E12FB3AC96A7D18D61B1A714",
    ethPrivKey:
      "c5b7343bec74fdfb7ef17b7b380f3a5967f60231731563c42520ab80797b179a",
    ontAddress: "AecaeSEBkt5GcBCxwz1F41TvdjX3dnKBkJ",
    ontAddressByteArray: "fa88f5244be19659bbd24477caeeacac7cbf781b",
    ontPrivKey:
      "0067ae8a3731709d8c820c03b200b9552ec61e6634cbcaf8a6a1f9d8f9f0f608"
  },
  bob: {
    name: "bob",
    displayName: "Bob",
    ethAddress: "0x95026e6E2A93283f54774d81B0b5d9892B3Ca3f2",
    ethPrivKey:
      "5e073f33d224bb76ecc158f07e41e05681ef3e3b16b26fe917955942c5fdf23b",
    // junior fringe moment drum aware cup pepper insane month subway gloom burger candy winter uncle climb online photo normal circle crop senior move speak
    ontAddress: "AGE6S1NRNPJaemynBnWYTXTS9vxSPFZ6VA",
    ontAddressByteArray: "04f57cb174af1feb5d7a34197ea72621778c8988",
    ontPrivKey:
      "e0342966b157c1a114b93a61ba6389b6a55c8dd354e6f7bccd04b55aac0f9684"
  }
};

export const layoutPermissionsByUser = {
  alice: [
    {
      displayName: "Home",
      route: "/"
    },
    {
      displayName: "Create order",
      route: "/create-order"
    },
    {
      displayName: "Check order data",
      route: "/order-data"
    },
    {
      displayName: "Cancel and refund",
      route: "/refund"
    },
    {
      displayName: "Lock buyer address",
      route: "/lock-address"
    },
    {
      displayName: "Claim ETH",
      route: "/claim"
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
      displayName: "Check order data",
      route: "/order-data"
    },
    {
      displayName: "Cancel and refund",
      route: "/refund"
    },
    {
      displayName: "Lock initiator address",
      route: "/lock-address"
    },
    {
      displayName: "Claim ONT",
      route: "/claim"
    }
  ]
};

export const ontNodeEndpoint = "http://polaris1.ont.io:20334";

export const notifyTimeout = 30000;

export const ethDecimals = 10 ** 8;
export const ethGasLimit = 2000000;
export const ethContractJsonInterface = [
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
