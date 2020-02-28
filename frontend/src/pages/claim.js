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
import { claimOnt, claimEth } from "../api/claim";

const handleClaimOnt = async (user, hashlock, secret) => {
  const result = await claimOnt(hashlock, secret, user);
  if (result.Error === 0) {
    return result;
  }
  throw new Error(result.Result);
};

const handleClaimEth = async (user, hashlock, secret) => {
  const result = await claimEth("0x" + hashlock, secret, user);
  return result;
};

const userToClaimHandler = {
  alice: {
    label: "Claim ETH",
    handler: handleClaimEth
  },
  bob: {
    label: "Claim ONT",
    handler: handleClaimOnt
  }
};

class Claim extends Component {
  handleFormSubmit = async (values, formActions) => {
    try {
      const { user } = this.props;
      const { hashlock, secret } = values;

      const { handler } = userToClaimHandler[user.name];
      const result = await handler(user, hashlock, secret);
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
    const { label } = userToClaimHandler[user.name];

    return (
      <>
        <PageHeader
          title="Claim assets"
          subTitle="Here you can finalize the exchange process by claiming assets"
        />
        <Card style={{ marginTop: 20 }}>
          <Formik
            onSubmit={this.handleFormSubmit}
            initialValues={{
              hashlock: "",
              secret: ""
            }}
            validate={values => {
              let errors = {};

              if (!values.hashlock) {
                errors.hashlock = "Required field";
              }
              if (!values.secret) {
                errors.secret = "Required field";
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
                        validateStatus={errors.secret ? "error" : ""}
                        help={errors.secret ? errors.secret : ""}
                      >
                        <Input
                          name="secret"
                          placeholder="Order secret"
                          value={values.secret ? values.secret : ""}
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
})(Claim);
