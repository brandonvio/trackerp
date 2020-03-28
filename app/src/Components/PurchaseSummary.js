import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import CurrencyFormat from "react-currency-format";

export const PurchaseSummary = ({ summary }) => {
  return (
    <ListGroup>
      <ListGroupItem className="justify-content-between">
        Number of Purchases:&nbsp;
        <b>{summary.transactionCount}</b>
      </ListGroupItem>
      <ListGroupItem className="justify-content-between">
        Average Purchase Amount:&nbsp;
        <b>
          <CurrencyFormat
            displayType="text"
            decimalScale={2}
            value={summary.averagePurchaseAmount}
            thousandSeparator={true}
            prefix={"$"}
          />
        </b>
      </ListGroupItem>
      <ListGroupItem className="justify-content-between">
        Total Purchase Amount:&nbsp;
        <b>
          <CurrencyFormat
            displayType="text"
            decimalScale={2}
            value={summary.totalPurchaseAmount}
            thousandSeparator={true}
            prefix={"$"}
          />
        </b>
      </ListGroupItem>
    </ListGroup>
  );
};
