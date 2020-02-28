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
import { getOrderDataOnt } from "../api/getOrderData";
import { respondToOrderBuyOnt } from "../api/respondToOrder";

class RespondToOrder extends Component {
  handleFormSubmit = async (values, formActions) => {
    try {
      const { user } = this.props;

      const orderData = await getOrderDataOnt(values.hashlock);
      if (orderData.initiator !== "") {
        const result = await respondToOrderBuyOnt(
          "0x" + values.hashlock,
          orderData.amountOfEthToBuy,
          user
        );
        console.log(result);
        notification["success"]({
          message: "Operation successful"
        });
      }
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
    return (
      <>
        <PageHeader
          title="Respond to order"
          subTitle="Here you can respond to order by entering its hashlock"
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
            {({
              values,
              errors,
              isSubmitting,
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue
              // touched,
            }) => {
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
                          Respond to order
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
})(RespondToOrder);
