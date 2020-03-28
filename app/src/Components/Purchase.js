import React from "react";
import { Card, Button, CardHeader, CardFooter, CardBody } from "reactstrap";
import Moment from "react-moment";
import CurrencyFormat from "react-currency-format";

export const Purchase = ({ item, deletePurchase, editPurchase }) => {
  // console.log(item);
  return (
    <Card>
      <CardHeader>
        <Moment format="M/D/YYYY">{item.purchaseDate}</Moment>
      </CardHeader>
      <CardBody>
        <table width="100%">
          <tbody>
            <tr>
              <th width="10%">Payee</th>
              <td width="30%">{item.payee}</td>
              <th width="10%">Amount</th>
              <td>
                <CurrencyFormat
                  displayType="text"
                  decimalScale={2}
                  value={item.amount}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{item.category}</td>
              <td colSpan="2">
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    editPurchase(item.sk);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="warning"
                  onClick={() => {
                    deletePurchase(item.sk);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter>{item.memo}</CardFooter>
    </Card>
  );
};
