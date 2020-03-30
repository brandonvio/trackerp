import axios from "axios";

export class PurchaseService {
  purchaseApi = process.env.REACT_APP_PURCHASE_API;
  categoryApi = process.env.REACT_APP_CATEGORY_API;

  async getPurchases() {
    let result = await axios.get(`${this.purchaseApi}`);
    return result.data;
  }

  async getPurchase(purchaseId) {
    let result = await axios.get(`${this.purchaseApi}/${purchaseId}`);
    const item = result.data;
    item.purchaseDate = item.purchaseDate.split("T")[0];
    return item;
  }

  async savePurchase(data) {
    let result = await axios.post(`${this.purchaseApi}`, data);
    return result.data;
  }

  async deletePurchase(purchaseId) {
    let result = await axios.delete(`${this.purchaseApi}/${purchaseId}`);
    return result.data;
  }

  async getCategories() {
    let result = await axios.get(`${this.categoryApi}`);
    return result.data;
  }
}
