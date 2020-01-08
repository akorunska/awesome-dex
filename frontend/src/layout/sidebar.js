import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Menu } from "antd";
import { layoutPermissionsByUser } from "../api/constants";

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  handleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  getSiderLayout = () => {
    const { user } = this.props;
    const layoutItems = [];

    for (let layoutItem of layoutPermissionsByUser[user.name]) {
      layoutItems.push(
        <Menu.Item key={layoutItem.route}>
          <Link to={layoutItem.route} className="ant-menu-item-content">
            <span>{layoutItem.displayName}</span>
          </Link>
        </Menu.Item>
      );
    }
    return layoutItems;
  };

  render() {
    return (
      <Sider
        className="sidebar"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.handleCollapse}
        // width="240"
      >
        <Menu theme="dark" mode="inline">
          {this.getSiderLayout()}
        </Menu>
      </Sider>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(Sidebar);
