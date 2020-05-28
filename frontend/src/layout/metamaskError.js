import React, { Component } from "react";
import { PageHeader, Card } from "antd";

class MetaMaskError extends Component {
  render() {
    return (
      <>
        <Card style={{ marginTop: 20 }}>
          <PageHeader title="Please, install Metamask to use this demo." />
        </Card>
      </>
    );
  }
}

export default MetaMaskError;
