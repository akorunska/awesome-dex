import React, { Component } from "react";
import { Layout, Typography, Menu } from "antd";
import Sidebar from "./sidebar";
import styled, { css } from "styled-components";

const { Header, Footer } = Layout;
const { Title } = Typography;

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

const Logo = styled.div`
    padding-top: 1.5em;
	height: 2.5rem;
    line-height: 2rem;
    h4 {
        color: white;
    }
`;

class AppLayout extends Component {

    render() {
        const { location, children } = this.props;
        return (
        <>
            <Layout className="main-layout">
                <Header className="header">
                    <Logo>
                        <Title level={4}>Awesome DEX</Title>
                    </Logo>
                </Header>
                <Layout style={{height:"100vh"}}>
                    <Sidebar
                        // location={location}
                    />
                        <MainContent>{children}</MainContent>
                </Layout>
                <Footer style={{backgroundColor: 'red'}}>i'm here</Footer>
            </Layout>
        </>);
    }
}

export default AppLayout;