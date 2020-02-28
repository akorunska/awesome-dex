import React, { Component } from "react";
import { connect } from "react-redux";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Form,
  Input,
  Card,
  notification
} from "antd";
import { Formik } from "formik";
import { lockBuyerAddress, lockIntiatorAddress } from "../api/lockAddress";

const handleLockBuyerAddress = async (user, hashlock, address) => {
  const result = await lockBuyerAddress(hashlock, address, user);
  if (result.Error === 0) {
    return result;
  }
  throw new Error(result.Result);
};

const handleLockInitiatorAddress = async (user, hashlock, address) => {
  const result = await lockIntiatorAddress("0x" + hashlock, address, user);
  return result;
};

const userToClaimHandler = {
  alice: {
    label: "Lock buyer address",
    addressInputPlaceholder: "Buyer Ontology address",
    partyAddressDefault: "04f57cb174af1feb5d7a34197ea72621778c8988",
    handler: handleLockBuyerAddress
  },
  bob: {
    label: "Lock initiator address",
    addressInputPlaceholder: "Initiator Ethereum address",
    partyAddressDefault: "0x174315c0039f0160E12FB3AC96A7D18D61B1A714",
    handler: handleLockInitiatorAddress
  }
};

class LockAddress extends Component {
  handleFormSubmit = async (values, formActions) => {
    try {
      const { user } = this.props;
      const { hashlock, partyAddress } = values;

      const { handler } = userToClaimHandler[user.name];
      const result = await handler(user, hashlock, partyAddress);
      console.log(result);
      notification["success"]({
        message: "Operation successful"
      });
    } catch (e) {
      console.log(e);
      notification["error"]({
        message: "An error occurred",
        description: e.message
      });
    }
    formActions.setSubmitting(false);
  };

  render() {
    const { user } = this.props;
    const {
      label,
      addressInputPlaceholder,
      partyAddressDefault
    } = userToClaimHandler[user.name];

    return (
      <>
        <PageHeader
          title={label}
          subTitle="Here you can lock the other party's address to proceed with exchange"
        />
        <Card style={{ marginTop: 20 }}>
          <Formik
            onSubmit={this.handleFormSubmit}
            initialValues={{
              hashlock: "",
              partyAddress: partyAddressDefault
            }}
            validate={values => {
              let errors = {};

              if (!values.hashlock) {
                errors.hashlock = "Required field";
              }
              if (!values.partyAddress) {
                errors.partyAddress = "Required field";
              }
              return errors;
            }}
          >
            {({ values, errors, isSubmitting, handleSubmit, handleChange }) => {
              const allowToSubmitForm = true;
              return (
                <form onSubmit={handleSubmit}>
                  <Row gutter={16}>
                    <Col lg={14}>
                      <Form.Item
                        required
                        validateStatus={errors.hashlock ? "error" : ""}
                        help={errors.hashlock ? errors.hashlock : ""}
                      >
                        <Input
                          name="hashlock"
                          placeholder="Order hashlock"
                          value={values.hashlock ? values.hashlock : ""}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={14}>
                      <Form.Item
                        required
                        validateStatus={errors.partyAddress ? "error" : ""}
                        help={errors.partyAddress ? errors.partyAddress : ""}
                      >
                        <Input
                          name="partyAddress"
                          placeholder={addressInputPlaceholder}
                          value={values.partyAddress ? values.partyAddress : ""}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={!allowToSubmitForm || isSubmitting}
                          loading={isSubmitting}
                        >
                          {label}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </form>
              );
            }}
          </Formik>
        </Card>
      </>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(LockAddress);
