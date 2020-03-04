import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Card, Descriptions } from "antd";

class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <>
        <PageHeader title="Awesome DEX Home" />
        <Card style={{ marginTop: 20 }}>
          <Descriptions
            title={`You are currently logged in as ${user.displayName}`}
          >
            <Descriptions.Item label="Ontology address">
              {user.ontAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Ontology address (hex)">
              {user.ontAddressByteArray}
            </Descriptions.Item>
            <Descriptions.Item label="Ethereum address">
              {user.ethAddress}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(Home);
