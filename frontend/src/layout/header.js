import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { Layout, Typography, Radio } from "antd";
import { users } from "../api/constants";
import Actions from "../redux/actions";

const { Header } = Layout;
const { Title } = Typography;

const Logo = styled.div`
  padding-top: 1.5em;
  line-height: 2rem;
  h4 {
    color: white;
  }
`;
const HeaderLayout = styled.header`
  justify-content: space-between;
  align-items: baseline;
  display: flex;
  flex: 0 0 auto;
  }
`;

class AppHeader extends Component {
  handleUserChange = e => {
    const { setUser } = this.props;

    setUser(users[e.target.value]);
  };

  render() {
    const { user } = this.props;
    const { alice, bob } = users;

    return (
      <Header className="header">
        <HeaderLayout>
          <Logo>
            <Title level={4}>Awesome DEX</Title>
          </Logo>
          <Radio.Group
            onChange={this.handleUserChange}
            defaultValue={user.name}
          >
            {}
            <Radio.Button value={alice.name}>{alice.displayName}</Radio.Button>
            <Radio.Button value={bob.name}>{bob.displayName}</Radio.Button>
          </Radio.Group>
        </HeaderLayout>
      </Header>
    );
  }
}

export default connect(
  state => {
    return {
      user: state.user
    };
  },
  {
    setUser: Actions.user.setUser
  }
)(AppHeader);
