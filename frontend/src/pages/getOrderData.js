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
  Descriptions
} from "antd";
import { Formik } from "formik";
import { getOrderData } from "../api/getOrderData";

// f621b7540089c6194b370608dc3116a1c555a64c98801e2cdfc1a900adc15ca2
class GetOrderData extends Component {
  state = {
    ontologyContractOrderData: {},
    ethereumContractOrderData: {}
  };

  handleFormSubmit = async (values, formActions) => {
    try {
      const result = await getOrderData(values.hashlock);
      console.log("received result: ", result);
      this.setState({ ontologyContractOrderData: result });
    } catch (e) {
      console.log(e);
    }
    formActions.setSubmitting(false);
  };

  getInitiator = async () => {
    // const { user } = this.props;

    try {
      // console.log(await get_initiator(secret, user));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { ontologyContractOrderData } = this.state;
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
          <Card>
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
      </>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(GetOrderData);
