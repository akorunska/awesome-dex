import React, { Component } from "react";
import { Layout } from "antd";
import styled, { css } from "styled-components";
import Sidebar from "./sidebar";
import AppHeader from "./header";
import MetaMaskError from "./metamaskError";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

const MainContent = styled.main`
  flex: auto;
  min-height: 360px;
  position: relative;

  ${(p) =>
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
    const { children } = this.props;

    return (
      <>
        <Layout className="main-layout">
          <AppHeader />
          <Layout style={{ height: "100vh" }}>
            {web3.currentProvider &&
            web3.currentProvider.isMetaMask === true ? (
              <>
                <Sidebar />
                <MainContent>{children}</MainContent>
              </>
            ) : (
              <MainContent>
                <MetaMaskError></MetaMaskError>
              </MainContent>
            )}
          </Layout>
        </Layout>
      </>
    );
  }
}

export default AppLayout;
