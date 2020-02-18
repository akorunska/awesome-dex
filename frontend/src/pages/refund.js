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
import { refundOnt, refundEth } from "../api/refund";

const handleRefundOnt = async (user, hashlock) => {
  const result = await refundOnt(hashlock, user);
  if (result.Error === 0) {
    return result;
  }
  throw new Error(result.Result);
};

const handleRefundEth = async (user, hashlock) => {
  const result = await refundEth("0x" + hashlock, user);
  return result;
};

const userToRefundHandler = {
  alice: {
    label: "Refund ONT",
    handler: handleRefundOnt
  },
  bob: {
    label: "Refund ETH",
    handler: handleRefundEth
  }
};

class Refund extends Component {
  handleFormSubmit = async (values, formActions) => {
    try {
      const { user } = this.props;

      const { handler } = userToRefundHandler[user.name];
      const result = await handler(user, values.hashlock);
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
    const { label } = userToRefundHandler[user.name];

    return (
      <>
        <PageHeader
          title="Cancel and refund"
          subTitle="Here you can refund assets from the smart contract"
        />
        <Card style={{ marginTop: 20 }}>
          <Formik
            onSubmit={this.handleFormSubmit}
            initialValues={{
              hashlock: ""
            }}
            validate={values => {
              let errors = {};

              if (!values.hashlock) {
                errors.hashlock = "Required field";
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
})(Refund);
