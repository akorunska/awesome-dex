import React, { Component } from "react";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Form,
  Input,
  Card,
  Descriptions
} from "antd";
import { Formik } from "formik";
import { getOrderDataOnt, getOrderDataEth } from "../api/getOrderData";

class GetOrderData extends Component {
  state = {
    ontologyContractOrderData: {},
    ethereumContractOrderData: {}
  };

  handleFormSubmit = async (values, formActions) => {
    try {
      const resultOnt = await getOrderDataOnt(values.hashlock);
      const resultEth = await getOrderDataEth("0x" + values.hashlock);
      console.log("received result ont: ", resultOnt);
      console.log("received result eth: ", resultEth);
      this.setState({ ontologyContractOrderData: resultOnt });
      this.setState({ ethereumContractOrderData: resultEth });
    } catch (e) {
      console.log(e);
    }
    formActions.setSubmitting(false);
  };

  render() {
    const { ontologyContractOrderData, ethereumContractOrderData } = this.state;
    return (
      <>
        <PageHeader
          title="Check order data"
          subTitle="Here you get order data by it's hashlock"
        />
        <Card style={{ marginTop: 20 }}>
          <Formik
            onSubmit={this.handleFormSubmit}
            initialValues={{
              hashlock:
                "a0f9924f473606a6445fbc2507d265eb360fed5abdeb3cfc5a1a43ad1e831d36"
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
                          Check order data
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </form>
              );
            }}
          </Formik>
        </Card>

        {Object.entries(ontologyContractOrderData).length !== 0 ? (
          <Card style={{ marginTop: 20 }}>
            <Descriptions title="Ontology contract info">
              <Descriptions.Item label="Intiator">
                {ontologyContractOrderData.initiator}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of ont to sell">
                {ontologyContractOrderData.amountOfOntToSell}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of eth to buy">
                {ontologyContractOrderData.amountOfEthToBuy}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}

        {Object.entries(ethereumContractOrderData).length !== 0 ? (
          <Card style={{ marginTop: 20 }}>
            <Descriptions title="Ethereum contract info">
              <Descriptions.Item label="Intiator">
                {ethereumContractOrderData.initiator}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of eth lockerd">
                {ethereumContractOrderData.amountEthLocked}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of eth to buy">
                {ethereumContractOrderData.amountOfEthToBuy}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}
      </>
    );
  }
}

export default GetOrderData;
