pragma solidity ^0.5.10;

contract Exchange {
    enum Status {
        Responed, // somebody responded to the order
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

    mapping (string => respondedOrder[]) orderList; // hashlock => order data, one record for every response
    string[] orderIdList;

    function respondToOrder (string memory hashlock, uint amountEthToLock) public payable {
        require(msg.value == amountEthToLock);
        orderIdList.push(hashlock);
        orderList[hashlock].push(respondedOrder({
            buyerAddress: address(0),
            initiatorAddress: msg.sender,
            hashlock: hashlock,
            amountEthLocked: amountEthToLock,
            refundTimelock: 0,
            claimTimelock: 0,
            secret: "",
            status: Status.Responed
        }));
    }

    function lockIntiatorAddress (string memory hashlock, address initiatorAddress) public {
        int orderIndex = getOrderByHashlockAndBuyer(hashlock, msg.sender);
        require(orderIndex >= 0);
        orderList[hashlock][uint(orderIndex)].initiatorAddress = initiatorAddress;
        orderList[hashlock][uint(orderIndex)].refundTimelock = now + 60*60*24;
        orderList[hashlock][uint(orderIndex)].claimTimelock = now + 60*60*24;
        orderList[hashlock][uint(orderIndex)].status = Status.Locked;
    }

    function claimEth (string memory hashlock, address buyerAddress) public {
        int orderIndex = getOrderByHashlockAndBuyer(hashlock, buyerAddress);
        require (orderIndex >= 0);
        require(orderList[hashlock][uint(orderIndex)].status == Status.Locked);
        require(orderList[hashlock][uint(orderIndex)].initiatorAddress == msg.sender);
        require(now >= orderList[hashlock][uint(orderIndex)].claimTimelock);

        // todo check hash(secret) equals hashlock

        orderList[hashlock][uint(orderIndex)].status = Status.Performed;
        msg.sender.transfer(orderList[hashlock][uint(orderIndex)].amountEthLocked);
    }

    function refundEth (string memory hashlock) public {
        int orderIndex = getOrderByHashlockAndBuyer(hashlock, msg.sender);
        require(orderIndex >= 0);
        require(orderList[hashlock][uint(orderIndex)].buyerAddress == msg.sender);
        require(orderList[hashlock][uint(orderIndex)].status != Status.Refunded && orderList[hashlock][uint(orderIndex)].status != Status.Performed);
        if (orderList[hashlock][uint(orderIndex)].status == Status.Locked) {
            require(now >= orderList[hashlock][uint(orderIndex)].refundTimelock);
        }
        // initiate refunding
        // when user refunds eth and the deal was not locked, we delete his / her tx data to free some space in storage
        // solidity arrays do not provide pop(), so we swap current element with last one and then delete the last one
        orderList[hashlock][uint(orderIndex)] = orderList[hashlock][orderList[hashlock].length - 1];
        delete orderList[hashlock][orderList[hashlock].length - 1];
        orderList[hashlock].length--;
    }

    function getOrderByHashlockAndBuyer(string memory hashlock, address buyerAddress) private view returns (int) {
        for (uint i = 0; i < orderList[hashlock].length; i++) {
            if (orderList[hashlock][i].buyerAddress == buyerAddress) {
                return int(i);
            }
            return -1;
        }
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
