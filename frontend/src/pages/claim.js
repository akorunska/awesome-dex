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

const handleClaimOnt = async (user, hashlock) => {
  const result = await claimOnt(hashlock, user);
  if (result.Error === 0) {
    return result;
  }
  throw new Error(result.Result);
};

const handleClaimEth = async (user, hashlock) => {
  const result = await claimEth("0x" + hashlock, user);
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

      const { handler } = userToClaimHandler[user.name];
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
          title="Claim assets"
          subTitle="Here you can finalize the exchange process by claiming assets"
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
})(Claim);
