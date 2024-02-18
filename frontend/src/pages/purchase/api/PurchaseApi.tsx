import jwtInterceptor from "../../../util/jwtInterceptor";
import { PurchaseType } from "../columns";

export type CreatePurchaseType = {
  id: string;
  total: number;
  grandTotal: number;
  purchaseDate: Date;
  supplierId: number;
  remark: string;
  purchaseDetails: PurchaseDetail[];
};
export type PurchaseDetail = {
  id: string;
  productId: string;
  productName: string;
  qty: number;
  price: number;
  total: number;
};

const fetchPurchases = async () => {
  const response = await jwtInterceptor.get("http://localhost:5555/purchase/", {
    withCredentials: true,
  });
  return response.data;
};

const fetchIndividualPO = async (po: PurchaseType) => {
  const response = await jwtInterceptor.get(
    `http://localhost:5555/purchase/${po.id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const createPurchase = async (newPurchase: CreatePurchaseType) => {
  const response = await jwtInterceptor.post(
    "http://localhost:5555/purchase/",
    newPurchase,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const PurchaseService = {
  fetchPurchases,
  createPurchase,
  fetchIndividualPO,
};

export default PurchaseService;
