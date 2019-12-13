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
        string hashlock; // maybe not string
        uint amountEthLocked;
        uint refundTimelock;
        uint claimTimelock;
        string secret; // maybe not string
        Status status;
    }

    mapping (string => respondedOrder) orderList; // hashlock => order data, one record for every response
    // string[] orderIdList;

    function respondToOrder (string memory hashlock, uint amountEthToLock) public payable {
        require(msg.value == amountEthToLock);
        
        orderList[hashlock] = respondedOrder({
            buyerAddress: address(0),
            initiatorAddress: msg.sender,
            hashlock: hashlock,
            amountEthLocked: amountEthToLock,
            refundTimelock: 0,
            claimTimelock: 0,
            secret: "",
            status: Status.Responded
        });
    }

    function lockIntiatorAddress (string memory hashlock, address initiatorAddress) public {
        // todo require that such hashlock is registered
        orderList[hashlock].initiatorAddress = initiatorAddress;
        orderList[hashlock].refundTimelock = now + 60*60*24;
        orderList[hashlock].claimTimelock = now + 60*60*24;
        orderList[hashlock].status = Status.Locked;
    }

    function claimEth (string memory hashlock, address buyerAddress) public {
        // todo require that such hashlock is registered
        require(orderList[hashlock].status == Status.Locked);
        require(orderList[hashlock].initiatorAddress == msg.sender);
        require(now >= orderList[hashlock].claimTimelock);

        // todo check hash(secret) equals hashlock

        orderList[hashlock].status = Status.Performed;
        msg.sender.transfer(orderList[hashlock].amountEthLocked);
    }

    function refundEth (string memory hashlock) public {
        // todo require that such hashlock is registered
        require(orderList[hashlock].buyerAddress == msg.sender);
        require(orderList[hashlock].status != Status.Refunded && orderList[hashlock][uint(orderIndex)].status != Status.Performed);
        if (orderList[hashlock].status == Status.Locked) {
            require(now >= orderList[hashlock].refundTimelock);
        }
        // initiate refunding
        // when user refunds eth and the deal was not locked, we delete his / her tx data to free some space in storage
        // solidity arrays do not provide pop(), so we swap current element with last one and then delete the last one
        orderList[hashlock].status = Status.Refunded;
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory temp = bytes(source);
        if (temp.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}