pragma solidity ^0.5.10;

contract Exchange {
    enum Status {
        Responded, // somebody responded to the order
        Locked, // initiatorAddress was locked by buyer
        Refunded, // ETH was refunded to buyer
        Performed // ETH was sucessfully claimed by order initiators
    }

    struct respondedOrder {
        address initiatorAddress;
        address buyerAddress;
        bytes32 hashlock; // maybe not string
        uint amountEthLocked;
        uint refundTimelock;
        uint claimTimelock;
        string secret; // maybe not string
        Status status;
    }

    mapping (bytes32 => respondedOrder) public orderList; // hashlock => order data
    uint timelockDuration = 10; // set to 10 seconds for testing purposes, should be 60*60*24;

    function respondToOrder (bytes32 hashlock, uint amountEthToLock) public payable {
        require(msg.value == amountEthToLock, "Insufficient amount of ETH provided");

        orderList[hashlock] = respondedOrder({
            buyerAddress: address(msg.sender),
            initiatorAddress: address(0),
            hashlock: hashlock,
            amountEthLocked: amountEthToLock,
            refundTimelock: 0,
            claimTimelock: 0,
            secret: "",
            status: Status.Responded
        });
    }

    function lockIntiatorAddress (bytes32 hashlock, address initiatorAddress) public {
        require(orderList[hashlock].buyerAddress == msg.sender, "Can only be perfomed by order buyer");
        require(orderList[hashlock].status == Status.Responded, "Order status should be Responded");

        orderList[hashlock].initiatorAddress = initiatorAddress;
        orderList[hashlock].refundTimelock = now + timelockDuration;
        orderList[hashlock].claimTimelock = now + timelockDuration;
        orderList[hashlock].status = Status.Locked;
    }

    function claimEth (bytes32 hashlock, string memory secret) public {
        require(orderList[hashlock].initiatorAddress == msg.sender, "Can only be perfomed by order initiator");
        require(orderList[hashlock].status == Status.Locked, "Order status should be Locked");
        require(sha256(abi.encodePacked(secret)) == hashlock, "Secret does not match the hashlock");
        
        orderList[hashlock].status = Status.Performed;
        msg.sender.transfer(orderList[hashlock].amountEthLocked);
    }

    function refundEth (bytes32 hashlock) public payable {
        require(orderList[hashlock].buyerAddress == msg.sender, "Can only be perfomed by order buyer");
        require(orderList[hashlock].status != Status.Refunded && orderList[hashlock].status != Status.Performed,
        "Order was already Performed or Refunded");
        if (orderList[hashlock].status == Status.Locked) {
            require(now >= orderList[hashlock].refundTimelock, "Timelock is not over");
        }

        orderList[hashlock].status = Status.Refunded;
        msg.sender.transfer(orderList[hashlock].amountEthLocked);
    }
}

// https://emn178.github.io/online-tools/sha256.html
// use 0x + the actual sha when passing parameters
