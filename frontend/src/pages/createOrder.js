import React, { Component } from 'react';
import { PageHeader, Button } from 'antd';
import { Formik } from 'formik'
import { getOntologyAccount } from '../api/constants'
import { createOrderSellOnt, get_initiator } from '../api/createOrder'
import { Row, Col, Form, Select, Input, Card } from "antd";

const { Option } = Select;

class CreateOrder extends Component {
  handleFormSubmit = async (values, formActions) => {
    const account = await getOntologyAccount();
    try {
      const secret = 'secret';
      createOrderSellOnt(values.ontAmount, values.ethAmount, secret, account);
      // get_initiator(secret);
    } catch (e) {
      console.log(e);
    }
    formActions.setSubmitting(false);
  }

  getInitiator = async () => {
    try {
      const secret = 'secret22';
      get_initiator(secret);
    } catch (e) {
      console.log(e);
    }
  }



  handleAssetToSellChange = setFieldValue => value => {
    setFieldValue("assetToSell", value);
  };

  render() {
    const assetsToSell = ['ont', /* 'eth' */];
    return (
      <>
        <PageHeader title="Сreate order" subTitle="Here you can create the new order to exchange ONT to ETH and vice versa" />
        <Card style={{ marginTop: 20 }}>
          <Formik
            onSubmit={this.handleFormSubmit}
            initialValues={{
              assetToSell: assetsToSell[0],
              ontAmount: 120,
              ethAmount: 0.5,
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
              setFieldValue,
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
                          {
                            assetsToSell.map((asset, index) => {
                              return (
                                <Option key={index} value={asset}>
                                  {asset}
                                </Option>
                              );
                            })
                          }
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

                      <Button
                        disabled={!allowToSubmitForm || isSubmitting}
                        loading={isSubmitting}
                        onClick={this.getInitiator}
                      >
                        Get initiator
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

export default CreateOrder;