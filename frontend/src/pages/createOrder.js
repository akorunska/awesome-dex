import React, { Component } from "react";
import { PageHeader, Button } from "antd";
import { connect } from "react-redux";
import { Formik } from "formik";
import { createOrderSellOnt } from "../api/createOrder";
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Card,
  Descriptions,
  notification
} from "antd";
import { getHashlock } from "../utils/blockchain";
import { randomBytes } from "crypto";

const { Option } = Select;

class CreateOrder extends Component {
  state = {
    createdOrderData: {}
  };

  generateSecret = () => {
    return randomBytes(48).toString("hex");
  };

  handleFormSubmit = async (values, formActions) => {
    const { user } = this.props;
    const secret = this.generateSecret();
    const hashlock = getHashlock(secret);
    console.log(secret, hashlock);
    // 086e143d4dc3ddca6dfd8075163d6e06be4580407471b75025867be9ba358d064d5ad73c43f8f4df8ab03de362c9914d
    // a0f9924f473606a6445fbc2507d265eb360fed5abdeb3cfc5a1a43ad1e831d36
    try {
      const result = await createOrderSellOnt(
        values.ontAmount,
        values.ethAmount,
        hashlock,
        user
      );
      console.log(result);
      if (result.Error === 0) {
        this.setState({
          createdOrderData: {
            secret: secret,
            hashlock: hashlock
          }
        });
      } else {
        console.log(result);
        notification["error"]({
          message: "An error occurred",
          description: "Error when executing smart contract"
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

  handleAssetToSellChange = setFieldValue => value => {
    setFieldValue("assetToSell", value);
  };

  render() {
    const assetsToSell = ["ont" /* 'eth' */];
    const { createdOrderData } = this.state;

    return (
      <>
        <PageHeader
          title="Сreate order"
          subTitle="Here you can create the new order to exchange ONT to ETH"
        />
        <Card style={{ marginTop: 20 }}>
          <Formik
            onSubmit={this.handleFormSubmit}
            initialValues={{
              assetToSell: assetsToSell[0],
              ontAmount: 1,
              ethAmount: 0.05
            }}
            validate={values => {
              let errors = {};

              if (!values.assetToSell) {
                errors.assetToSell = "Required field";
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
                    <Col lg={4}>
                      <Form.Item
                        label="Asset to sell: "
                        required
                        validateStatus={errors.assetToSell ? "error" : ""}
                        help={errors.assetToSell ? errors.assetToSell : ""}
                      >
                        <Select
                          name="assetToSell"
                          value={values.assetToSell}
                          onChange={this.handleAssetToSellChange(setFieldValue)}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        >
                          {assetsToSell.map((asset, index) => {
                            return (
                              <Option key={index} value={asset}>
                                {asset}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col lg={10}>
                      <Form.Item
                        label="Amount of ont: "
                        required
                        validateStatus={errors.ontAmount ? "error" : ""}
                        help={errors.ontAmount ? errors.ontAmount : ""}
                      >
                        <Input
                          type="number"
                          step={0.00000001}
                          min={0.00000001}
                          name="ontAmount"
                          value={values.ontAmount ? values.ontAmount : 0}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={10}>
                      <Form.Item
                        label="Amount of eth: "
                        required
                        validateStatus={errors.ethAmount ? "error" : ""}
                        help={errors.ethAmount ? errors.ethAmount : ""}
                      >
                        <Input
                          type="number"
                          step={0.00000001}
                          min={0.00000001}
                          name="ethAmount"
                          value={values.ethAmount ? values.ethAmount : 0}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!allowToSubmitForm || isSubmitting}
                        loading={isSubmitting}
                      >
                        Create order
                      </Button>
                    </Col>
                  </Row>
                </form>
              );
            }}
          </Formik>
        </Card>
        {Object.entries(createdOrderData).length !== 0 ? (
          <Card style={{ marginTop: 20 }}>
            <Descriptions title="Please, save this values in order to manipulate your order, otherwise your funds will be lost">
              <Descriptions.Item label="Hashlock">
                {createdOrderData.hashlock}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Secret">
                {createdOrderData.secret}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}
      </>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(CreateOrder);
