import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Layout } from "antd";
import { Menu } from "antd";
import { layoutPermissionsByUser } from "../api/constants";

// const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

const Sidebar = withRouter(props => <RoutedSidebar {...props} />);

class RoutedSidebar extends Component {
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
    const { pathname } = this.props.location === "" ? "/" : this.props.location;

    return (
      <Sider className="sidebar">
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
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
