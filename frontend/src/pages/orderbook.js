import React, { Component } from 'react';
import { PageHeader } from 'antd';

class Orderbook extends Component {
    state = {
        orders: [
            {
                coinToBuy: 'ETH',
                amountToBuy: 0.5,
                coinToSell: 'ONT',
                amountToSell: 200,
                status: 'opened',
                initiatorEthAddr: '',
                initiatorOntAddr: 'AcKEYhZw8Gdux8R9jc3vhDYbCQCXRH44HD',
                buyerEthAddr: '',
                buyerOntAddr: '',
                hashlock: 'lock',
                initiatorRefundTimelock: 0,
                buyerRefundTimelock: 0,
                initiatorClaimTimelock: 0,
                secret: '',
            }
        ]
    }
    
    render() {
        return (
            <>
                <PageHeader> DEX Orderbook </PageHeader>
            </>
          );
    }
}

export default Orderbook;