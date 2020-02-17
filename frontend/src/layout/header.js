import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Typography } from "antd";
import ToggleUser from "./toggleUser";

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
  state = {
    redirect: false
  };
  render() {
    return (
      <Header className="header">
        <HeaderLayout>
          <Logo>
            <Title level={4}>Awesome DEX</Title>
          </Logo>
          <ToggleUser />
        </HeaderLayout>
      </Header>
    );
  }
}

export default AppHeader;
