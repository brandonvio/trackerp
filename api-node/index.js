require("dotenv").config();
const PurchaseService = require("./PurchaseService");
const purchaseService = new PurchaseService();

exports.getPurchase = async function(event) {
  try {
    const purchaseId = event.pathParameters.purchaseId;
    const result = await purchaseService.getPurchase(purchaseId);
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
    const result = await purchaseService.deletePurchase(purchaseId);
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
    const result = await purchaseService.savePurchase(JSON.parse(event.body));
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.getPurchaseList = async function(event) {
  try {
    const result = await purchaseService.getPurchaseList();
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.getCategoryList = async function(event) {
  try {
    const result = await purchaseService.getCategoryList();
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.seedCategories = async function(event) {
  try {
    const result = await purchaseService.seedCategories();
    console.log(JSON.stringify(result));
    return buildReponse(result, 200);
  } catch (error) {
    console.error(error);
    return buildReponse(error, 500);
  }
};

exports.seedPurchases = async function(event) {
  try {
    const result = await purchaseService.seedPurchases();
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
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data),
    isBase64Encoded: false
  };
  return response;
}
