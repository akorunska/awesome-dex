import React, { Component } from "react";
import { PageHeader, Button } from "antd";
import { connect } from "react-redux";
import { Formik } from "formik";
import { createOrderSellOnt, get_initiator } from "../api/createOrder";
import { Row, Col, Form, Select, Input, Card } from "antd";
import { getHashlock } from "../utils/blockchain";
import { randomBytes } from "crypto";

const { Option } = Select;

class CreateOrder extends Component {
  generateSecret = () => {
    return randomBytes(48).toString("hex");
  };

  handleFormSubmit = async (values, formActions) => {
    const { user } = this.props;
    const secret = this.generateSecret();
    const hashlock = getHashlock(secret);
    console.log(secret, hashlock);
    // 74a9691e2fc6b35bfd2a239808bc44e58c3bd7e5b06f37708ce65fc5c40fc7d47ad2ce29c92192a3fa92b5f73ab9e4aa
    // f621b7540089c6194b370608dc3116a1c555a64c98801e2cdfc1a900adc15ca2
    try {
      const result = await createOrderSellOnt(
        values.ontAmount,
        values.ethAmount,
        hashlock,
        user
      );
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    formActions.setSubmitting(false);
  };

  handleAssetToSellChange = setFieldValue => value => {
    setFieldValue("assetToSell", value);
  };

  render() {
    const assetsToSell = ["ont" /* 'eth' */];
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
              ontAmount: 120,
              ethAmount: 0.5
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
      </>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(CreateOrder);
