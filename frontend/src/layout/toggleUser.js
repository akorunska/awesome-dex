import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Radio } from "antd";
import { users } from "../api/constants";
import Actions from "../redux/actions";

class ToggleUser extends Component {
  state = {
    redirect: false
  };

  handleUserChange = e => {
    const { setUser } = this.props;

    setUser(users[e.target.value]);
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    const { user } = this.props;
    const { alice, bob } = users;

    if (redirect) {
      this.setState({ redirect: false });
      return <Redirect to="/" push={true} />;
    }

    return (
      <Radio.Group onChange={this.handleUserChange} defaultValue={user.name}>
        {}
        <Radio.Button value={alice.name}>{alice.displayName}</Radio.Button>
        <Radio.Button value={bob.name}>{bob.displayName}</Radio.Button>
      </Radio.Group>
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
)(ToggleUser);
