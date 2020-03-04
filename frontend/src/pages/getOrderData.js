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
              <Descriptions.Item label="Initiator">
                {ontologyContractOrderData.initiator}
              </Descriptions.Item>
              <Descriptions.Item label="Buyer">
                {ontologyContractOrderData.buyer}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of ont to sell">
                {ontologyContractOrderData.amountOfOntToSell}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of eth to buy">
                {ontologyContractOrderData.amountOfEthToBuy}
              </Descriptions.Item>
              <Descriptions.Item label="Refund timelock">
                {ontologyContractOrderData.refundTimelock !== 0
                  ? new Date(
                      ontologyContractOrderData.refundTimelock * 1000
                    ).toLocaleString()
                  : "unset"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}

        {Object.entries(ethereumContractOrderData).length !== 0 ? (
          <Card style={{ marginTop: 20 }}>
            <Descriptions title="Ethereum contract info">
              <Descriptions.Item label="Initiator">
                {ethereumContractOrderData.initiatorAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Buyer">
                {ethereumContractOrderData.buyerAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Amount of eth locked">
                {ethereumContractOrderData.amountEthLocked}
              </Descriptions.Item>
              <Descriptions.Item label="Refund timelock">
                {ethereumContractOrderData.refundTimelock !== "0"
                  ? new Date(
                      ethereumContractOrderData.refundTimelock * 1000
                    ).toLocaleString()
                  : "unset"}
              </Descriptions.Item>
              <Descriptions.Item label="Claim timelock">
                {ethereumContractOrderData.claimTimelock !== "0"
                  ? new Date(
                      ethereumContractOrderData.claimTimelock * 1000
                    ).toLocaleString()
                  : "unset"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}

        {ethereumContractOrderData.secret ? (
          <Card style={{ marginTop: 20 }}>
            <Descriptions title="The secret was revealed">
              <Descriptions.Item label="Secret">
                {ethereumContractOrderData.secret}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}
      </>
    );
  }
}

export default GetOrderData;
