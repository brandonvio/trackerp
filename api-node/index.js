require("dotenv").config();
const PurchaseService = require("./PurchaseService");
const _purchaseService = new PurchaseService();

exports.getPurchase = async function(event) {
  try {
    const purchaseId = event.pathParameters.purchaseId;
    const result = await _purchaseService.getPurchase(purchaseId);
    console.log(JSON.stringify(result));
    return buildReponse(result.Item, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.deletePurchase = async function(event) {
  try {
    const purchaseId = event.pathParameters.purchaseId;
    const result = await _purchaseService.deletePurchase(purchaseId);
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.savePurchase = async function(event) {
  try {
    console.log(event.body);
    const result = await _purchaseService.savePurchase(JSON.parse(event.body));
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.getPurchaseList = async function(event) {
  try {
    const result = await _purchaseService.getPurchaseList();
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.getCategoryList = async function(event) {
  try {
    const result = await _purchaseService.getCategoryList();
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.seed = async function(event) {
  try {
    let result = await _purchaseService.seedCategories();
    console.log(JSON.stringify(result));

    result = await _purchaseService.seedPurchases();
    console.log(JSON.stringify(result));

    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

function buildReponse(data, status) {
  var response = {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data),
    isBase64Encoded: false
  };
  return response;
}
