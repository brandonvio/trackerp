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

  const purchaseService = new PurchaseService();

  const getPurchases = async () => {
    let purchaseData = await trackPromise(purchaseService.getPurchases());
    console.log(purchaseData);
    setPurchases(purchaseData);
    setSummary({
      transactionCount: purchaseData.length,
      averagePurchaseAmount: _.meanBy(purchaseData, p => p.amount),
      totalPurchaseAmount: _.sumBy(purchaseData, p => p.amount)
    });

    let categories = await trackPromise(purchaseService.getCategories());
    console.log(categories);
    setCategories(categories);
  };

  const savePurchase = async data => {
    if (data.purchaseId === undefined) {
      // console.log("savePurchase", data);
      await trackPromise(purchaseService.savePurchase(data));
    } else {
      // console.log("updatePurchase", data);
      await trackPromise(purchaseService.updatePurchase(data));
    }
    getPurchases();
  };

  const deletePurchase = async purchaseId => {
    // console.log("deletePurchase", purchaseId);
    await trackPromise(purchaseService.deletePurchase(purchaseId));
    getPurchases();
  };

  const editPurchase = async purchaseId => {
    const purchase = await trackPromise(purchaseService.getPurchase(purchaseId));
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
