import React, { Component } from 'react';
import { PageHeader, Button, Table } from 'antd';

const orderData = [
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
];

const orderBookColumns = [
    {
        title: "For sell",
        dataIndex: "",
        key: "sell",
        render: record => (record ? record.coinToSell + " " + record.amountToSell  : "n/a"),
    },
    {
        title: "For buy",
        dataIndex: "",
        key: "buy",
        render: record => (record ? record.coinToBuy + " " + record.amountToBuy  : "n/a"),
    },
    {
        title: "Actions",
        render: res => (
            <div>
                <Button
                    type="warning"
                    icon="forward"
                    onClick={() => {
                        // send tx to smart contract
                    }}
                >
                        Respond to order
                </Button>
            </div>
        ),
    },
];

class Orderbook extends Component {
    state = {
        orderData: orderData,
    }

    render() {
        return (
            <>
                <PageHeader title="DEX Orderbook" subTitle="Here you can view orders and respond to them"/>
                <Table
					columns={orderBookColumns}
                    dataSource={orderData}
                    style={{marginTop: '1em'}}
				/>
            </>
          );
    }
}

export default Orderbook;