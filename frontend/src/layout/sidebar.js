import React, { Component } from "react";
import { Layout } from "antd";
import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;



class Sidebar extends Component {
    state = {
        collapsed: false,
    }

    handleCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
    };

    render () {
        return (
            <Sider
                className="sidebar"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.handleCollapse}
                // width="240"
            >
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="/">
                        <Link to="/" className="ant-menu-item-content">
                            <Icon type="dashboard" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/orderbook">
                        <Link to="/orderbook" className="ant-menu-item-content">
                            <Icon type="book" />
                            <span>OrderBook</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/create-order">
                        <Link to="/create-order" className="ant-menu-item-content">
                            <Icon type="plus-circle" />
                            <span>Create Order</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="operations"
                        title={
                            <span className="ant-menu-item-content">
                                <Icon type="interaction" />
                                <span>My orders</span>
                            </span>
                        }
                    >
                        {/* <Menu.Item key="/deposit">
                            <Link to="/deposit">Deposit</Link>
                        </Menu.Item>
                        <Menu.Item key="/send-asset">
                            <Link to="/send-asset">Send</Link>
                        </Menu.Item>
                        <Menu.Item key="/withdraw">
                            <Link to="/withdraw">Withdraw</Link>
                        </Menu.Item> */}
                    </SubMenu>
                </Menu>
            </Sider>
        );
    };
}

export default Sidebar;