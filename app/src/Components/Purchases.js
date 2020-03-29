import React, { useEffect, useState } from "react";
import { Purchase } from "./Purchase";
import { PurchaseService } from "../Services/PurchaseService";
import { PurchaseSummary } from "./PurchaseSummary";
import { PurchaseForm } from "./PurchaseForm";
import { trackPromise } from "react-promise-tracker";
import _ from "lodash";

export const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({});
  const [purchaseEditable, setPurchaseEditable] = useState({});
  const _purchaseService = new PurchaseService();

  const getPurchases = async () => {
    let purchases = await trackPromise(_purchaseService.getPurchases());
    purchases = _.orderBy(purchases, ["purchaseDate", "amount"], ["desc"]);
    console.log(purchases);
    setPurchases(purchases);
    setSummary({
      transactionCount: purchases.length,
      averagePurchaseAmount: _.meanBy(purchases, p => p.amount),
      totalPurchaseAmount: _.sumBy(purchases, p => p.amount)
    });

    const categories = await trackPromise(_purchaseService.getCategories());
    console.log(categories);
    setCategories(categories);
  };

  const savePurchase = async data => {
    await trackPromise(_purchaseService.savePurchase(data));
    getPurchases();
  };

  const deletePurchase = async purchaseId => {
    await trackPromise(_purchaseService.deletePurchase(purchaseId));
    getPurchases();
  };

  const editPurchase = async purchaseId => {
    const purchase = await trackPromise(_purchaseService.getPurchase(purchaseId));
    setPurchaseEditable(purchase);
  };

  useEffect(() => {
    getPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Purchases</h2>
      <PurchaseForm
        savePurchase={savePurchase}
        purchase={purchaseEditable}
        categories={categories}
      />
      <br />
      <PurchaseSummary summary={summary} />
      <br />
      {purchases.map(item => (
        <Purchase
          key={item.sk}
          item={item}
          deletePurchase={deletePurchase}
          editPurchase={editPurchase}
        />
      ))}
      <br />
    </div>
  );
};
