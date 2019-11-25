import React, { Component } from 'react';
import { PageHeader, Button } from 'antd';
import { Formik } from 'formik'
import { Row, Col, Form, Select, Input, Card } from "antd";

const Option = { Select };

class CreateOrder extends Component {
  handleAssetToSellChange = setFieldValue => value => {
    setFieldValue("assetToSell", value);
  };

  render() {
    const assetsToSell = ['ont', 'eth'];
    return (
      <>
        <PageHeader title="Сreate order" subTitle="Here you can create the new order to exchange ONT to ETH and vice versa" />
        {/* data for new order creation: amount of ont to sell, amount of eth to buy */}
        <Card style={{ marginTop: 20 }}>
          <Formik
            initialValues={{
              assetToSell: assetsToSell[0],
              ontAmount: 0,
              ethAmount: 0,
            }}>
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
                          step={100}
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
                          step={100}
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
                        Upgrade
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