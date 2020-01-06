import React, { Component } from "react";
import { Layout /* Menu */ } from "antd";
import styled, { css } from "styled-components";
import Sidebar from "./sidebar";
import AppHeader from "./header";

const MainContent = styled.main`
  flex: auto;
  min-height: 360px;
  position: relative;

  ${p =>
    !p.noPadding &&
    css`
      position: static;
      padding: 30px;
      @media (max-width: 575px) {
        padding: 15px;
      }
    `}
`;

export const MyContext = React.createContext(null);

class AppLayout extends Component {
  render() {
    console.log(this.props);
    const { children, user } = this.props;

    return (
      <>
        <Layout className="main-layout">
          <AppHeader />
          <Layout style={{ height: "100vh" }}>
            <Sidebar />
            <MainContent>{children}</MainContent>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default AppLayout;
