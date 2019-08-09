pragma solidity ^0.5.10;

contract Exchange {
    enum State {
        Opened, // somebody responded to the order
        Locked, // initiatorAddress was locked by buyer
        Refunded, // ETH was refunded to buyer
        Performed // ETH was sucessfully claimed by order initiators
    }

    struct respondedOrder {
        address initiatorAddress;
        address buyerAddress;
        string hashlock; // maybe not string
        uint amountEthLocked;
        uint refundTimelock;
        uint claimTimelock;
        string secret; // maybe not string
    }

    mapping (address => mapping(string => respondedOrder)) orderList;

    function respondToOrder () public {}

    function lockIntiatorAddress () public {}

    function claimEth () public {}

    function refundEth () public {}
}
