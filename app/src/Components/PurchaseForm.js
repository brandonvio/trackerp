import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import * as yup from "yup";
import { Formik } from "formik";
// import Select from "react-select";

export const PurchaseForm = ({ savePurchase, purchase, categories }) => {
  if (purchase.sk === undefined) {
    reset();
  }

  function reset() {
    purchase.payee = "";
    purchase.amount = "";
    purchase.purchaseDate = "";
    purchase.memo = "";
    purchase.category = "";
  }

  const submitForm = async data => {
    const formData = { ...data };
    reset();
    formData.purchaseDate = new Date(formData.purchaseDate).toISOString();
    formData.amount = parseFloat(formData.amount);

    await savePurchase(formData);
  };

  const schema = yup.object({
    payee: yup.string().required("Payee is required!"),
    amount: yup
      .number("Purchase Amount must be a number!")
      .positive("Purchase Amount must be positive!")
      .required("Purchase Amount is required!"),
    purchaseDate: yup
      .date("Purchase Date must be a valid date!")
      .required("Purchase Date is required!"),
    memo: yup.string().required("Memo is required!"),
    category: yup.string().required("Category is required!")
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      enableReinitialize={true}
      initialValues={{
        ...purchase
      }}
    >
      {({
        touched,
        errors,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        handleChange,
        handleBlur,
        values
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="payee">Payee</Label>

                  <Input
                    type="text"
                    name="payee"
                    id="payee"
                    value={values.payee}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.payee && touched.payee}
                  />
                  <FormFeedback tooltip>{errors.payee}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="amount">Purchase Amount</Label>
                  <Input
                    type="text"
                    name="amount"
                    id="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.amount && touched.amount}
                  />
                  <FormFeedback tooltip>{errors.amount}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="purchaseDate">Date of Purchase</Label>
                  <Input
                    type="text"
                    name="purchaseDate"
                    id="purchaseDate"
                    value={values.purchaseDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.purchaseDate && touched.purchaseDate}
                  />
                  <FormFeedback tooltip>{errors.purchaseDate}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: "block" }}
                  >
                    <option value="">Select a Category...</option>
                    {categories.map((item, index) => {
                      return (
                        <option key={index} value={item.categoryName}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </Input>
                  <FormFeedback tooltip>{errors.categoryId}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="memo">Memo</Label>
            <Input
              type="text"
              name="memo"
              id="memo"
              value={values.memo}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={errors.memo && touched.memo}
            />
          </FormGroup>
          <Button color="info" type="submit">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
