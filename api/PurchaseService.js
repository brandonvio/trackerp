const AWS = require("aws-sdk");

if (process.env.ENVIRONMENT === "DEV") {
  var credentials = new AWS.SharedIniFileCredentials({ profile: "terransible" });
  AWS.config.credentials = credentials;
}

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Purchase";
AWS.config.update({ region: "us-west-2" });

class PurchaseService {
  async getPurchase(purchaseId) {
    const params = {
      Key: {
        pk: "PURCHASE",
        sk: purchaseId
      },
      TableName: TABLE_NAME
    };
    const result = await dynamo.get(params).promise();
    console.log("result", result);
    return result;
  }

  async deletePurchase(purchaseId) {
    const params = {
      Key: {
        pk: "PURCHASE",
        sk: purchaseId
      },
      TableName: TABLE_NAME
    };
    const result = await dynamo.delete(params).promise();
    console.log("result", result);
    return result;
  }

  async savePurchase(purchase) {
    const params = {
      Item: purchase,
      TableName: TABLE_NAME
    };
    const result = await dynamo.put(params).promise();
    console.log("result", result);
    return result;
  }

  async getPurchaseList() {
    var params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "PURCHASE"
      }
    };
    const result = await dynamo.query(params).promise();
    return result.Items;
  }

  async getCategoryList() {
    var params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "CATEGORY"
      }
    };
    const result = await dynamo.query(params).promise();
    const categories = result.Items.map(p => ({
      categoryName: p.sk
    }));
    return categories;
  }

  async seedPurchases() {
    const purchases = [
      {
        pk: "PURCHASE",
        sk: "abea53e5-e7aa-4480-a554-4a702cadc936",
        purchaseDate: "2020-01-01T08:00:00.000Z",
        category: "Bills & Utilities",
        amount: 210.21,
        memo: "Electric bill.",
        payee: "Pacific Power"
      },
      {
        pk: "PURCHASE",
        sk: "358e8ba9-4649-4ff3-964b-db3a9b4d12d1",
        purchaseDate: "2020-01-01T08:00:00.000Z",
        category: "Entertainment",
        amount: 12.02,
        memo: "Movies with the kids.",
        payee: "Tower Theatre"
      },
      {
        pk: "PURCHASE",
        sk: "392d570c-5639-44ed-9f19-3490c4cf99d7",
        purchaseDate: "2020-01-01T08:00:00.000Z",
        category: "Personal Care",
        amount: 120.99,
        memo: "Hair, nails and massage.",
        payee: "Spa"
      },
      {
        pk: "PURCHASE",
        sk: "e1c058bb-276a-4eae-aee1-61d23065b50b",
        purchaseDate: "2020-01-01T08:00:00.000Z",
        category: "Auto & Transport",
        amount: 500.0,
        memo: "Car payment.",
        payee: "Oregon Credit Union"
      },
      {
        pk: "PURCHASE",
        sk: "04102d62-ba8a-48a5-ae12-e7cc621aa47f",
        purchaseDate: "2020-01-01T08:00:00.000Z",
        category: "Travel",
        amount: 5.29,
        memo: "Playa Del Carmen vacation.",
        payee: "Bend Travel Agency"
      }
    ];

    for (let purchase of purchases) {
      const params = {
        Item: purchase,
        TableName: TABLE_NAME
      };
      const result = await dynamo.put(params).promise();
      console.log("result", result);
    }

    return true;
  }

  async seedCategories() {
    const categories = [
      "Income",
      "Entertainment",
      "Education",
      "Shopping",
      "Personal Care",
      "Health & Fitness (was healthcare)",
      "Kids",
      "Food & Dining",
      "Gifts & Donations",
      "Investments",
      "Bills & Utilities",
      "Auto & Transport",
      "Travel",
      "Fees & Charges",
      "Business Services",
      "Taxes"
    ];

    for (let categoryName of categories) {
      const params = {
        Item: {
          pk: "CATEGORY",
          sk: categoryName
        },
        TableName: TABLE_NAME
      };
      const result = await dynamo.put(params).promise();
      console.log("result", result);
    }

    return true;
  }
}

module.exports = PurchaseService;
